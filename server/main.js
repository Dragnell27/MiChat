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
        // Ejecutamos el login

        login(datos.user, datos.password).then(data => {
            data = JSON.parse(data);
            if (data.status === "OK") {
                var loginData = {
                    'status':data.status,
                    'user': data.newUser,
                    'msg': 'Hola de nuevo ' + data.newUser + '.'
                };
                socket.emit('Welcome', loginData);
                socket.broadcast.emit('NewUserConnected', data.newUser + ', Se a conectado.');
            } else if (data.status === "NOT_FOUND") {
                guardarUsuarioEnServidor(datos.user, datos.password)
                    .then(data => {
                        data = JSON.parse(data);
                        if (data.status === "ok") {
                            var newDatos = {
                                'status': 'REGISTER',
                                'user': data.newUser,
                                'msg': '!Hola¡ ' + data.newUser + '. \n Bienvenido.'
                            };
                            socket.emit('Welcome', newDatos);
                            socket.broadcast.emit('NewUserConnected', data.newUser + ', Se a conectado.');
                        } else {
                            console.log('hubo un error: ' + data.msg);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }else if (data.status == 'FAILURE'){
                var loginData = {
                    'status': data.status,
                    'user': data.newUser,
                    'msg': 'El usuario "' + data.newUser + '" ya existe pero la contraseña es incorrecta.'
                };
                socket.emit('Welcome', loginData);
            }
        })
    })

    socket.on('login',(user)=>{
        socket.broadcast.emit('NewUserConnected',  user+ ', Se a conectado.');
    })

    socket.on('newMessage', (msg) => {
        socket.emit('mensaje propio', msg.text, msg.text);
        socket.broadcast.emit('mensaje nuevo', msg);
    })
})

function login(nameUser, passUser) {
    const formData = new FormData();

    formData.append('nameUser', nameUser);
    formData.append('passUser', passUser);

    return new Promise((resolve, reject) => {
        fetch('http://localhost/miChat/APIs/verifyExistingUser.php', {
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


function guardarUsuarioEnServidor(nameUser, passUser) {
    const formData = new FormData();
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