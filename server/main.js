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
        // origin: "http://localhost",
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    socket.on('newRegister', (datos) => {
        guardarUsuarioEnServidor(datos.user, datos.password)
        .then(data => {
            data = JSON.parse(data);
            if (data.status === "ok") {
                var datos = {
                    'user': data.newUser,
                    'msg' : '!Hola¡ '+data.newUser+'. \n Bienvenido.'
                };
                socket.emit('Welcome', datos);
                socket.broadcast.emit('NewUserConnected',data.newUser+ ', Se a conectado.');
            }else{
                console.log('hubo un error: ' + data.msg);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })

    socket.on('newMessage', (msg) => {
        socket.emit('mensaje propio', msg.text, msg.text);
        socket.broadcast.emit('mensaje nuevo', msg);
    })
})

function guardarUsuarioEnServidor(nameUser,passUser) {
    var formData = new FormData();
    formData.append('nameUser', nameUser);
    formData.append('passUser', passUser);

    return new Promise((resolve, reject) => {
        fetch('http://localhost/miChat/APIs/saveUser.php', {
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