import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors';


const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "http://localhost",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('nuevo registro', (datos) => {
        console.log(datos);
        guardarUsuarioEnServidor(socket.id, datos.nameUser, datos.passUser)
        .then(status => {
            console.log(status);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })

    socket.on('mensaje nuevo', (msg) => {
        socket.emit('mensaje propio', msg, msg);
        socket.broadcast.emit('mensaje nuevo', msg);
    })
})

function guardarUsuarioEnServidor(idSocket, nameUser,passUser) {
    var formData = new FormData();
    formData.append('nameUser', nameUser);
    formData.append('passUser', passUser);
    formData.append('idSocket', idSocket);

    return new Promise((resolve, reject) => {
        fetch('http://localhost/miChat/conexion/GuardarUsuario.php', {
            method: 'POST', 
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            console.error('Error al enviar la solicitud Fetch', error);
            reject(error);
        }); 
    });
}

server.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
});