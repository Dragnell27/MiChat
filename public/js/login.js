const contenedor = document.getElementById('fondo');
const contentMsg = document.getElementById('contentMsg');

function eliminarMensajes(){
    if (contentMsg.childNodes.length > 0) {
        contentMsg.removeChild(contentMsg.childNodes[0]);
    }
}

setInterval(eliminarMensajes,2000);

socket.on('inicio exitoso',(msg) => {
    contenedor.innerHTML = `<div class="contenido">
    <ul id="mensajes"></ul>
    <form id="form">
        <input type="text" id="input" autocomplete="off" placeholder="Nuevo mensaje">
        <button type="submit" id="Enviar">Enviar</button>
    </form>
</div>`;
const script = document.getElementById('scriptMensajes');
script.src = '../js/mensajes.js';
setTimeout(function () {
    alertPersonalizado(msg);
}, 300);
});

function alertPersonalizado(msg){
    const msgNotification = `<li id="myModal" class="modal">`+msg+`</li>`;
    contentMsg.insertAdjacentHTML('beforeend', msgNotification);
}

if (contenedor) {
    const elemento =
        `<div>
            <button id="btnRegistrarse">Registrarse</button>
            <button>Iniciar sesión</button>
        </div>`;
    contenedor.innerHTML = elemento;

    const btnRegistrase = document.getElementById('btnRegistrarse');
    btnRegistrase.addEventListener('click', () => {
        contenedor.innerHTML = registro;
        const nuevoScript = document.createElement('script');
        nuevoScript.id = 'eventos';
        nuevoScript.innerHTML = `const formNewUser = document.getElementById('guardarUsuario');
            formNewUser.addEventListener('submit', (e) => {
                const nameUser = document.getElementById('nameUser');
                const passUser = document.getElementById('passUser');

                var datos = {
                    "passUser" : passUser.value,
                    "nameUser" : nameUser.value
                }
                console.log(datos);
                e.preventDefault();
                if (nameUser.value && passUser.value) {
                    socket.emit('nuevo registro', datos);
                    nameUser.value = '';
                    passUser.value = '';
                }
            });`;
        const scriptExistente = document.getElementById('eventos');
        if (scriptExistente) {
            scriptExistente.parentNode.removeChild(scriptExistente);
        }
        document.body.appendChild(nuevoScript);
    });

    const registro =
        `<form action="" id="guardarUsuario">
        <div>
            <div>
                <div>
                    <label for="nameUser">Usuario</label>
                </div>
                <div>
                    <input type="text" id="nameUser">
                </div>
            </div>
            <br>
            <div>
                <div>
                    <label for="passUser">Contraseña</label>
                </div>
                <div>
                    <input type="text" id="passUser">
                </div>
            </div>
            <div>
                <div>
                    <br>
                    <input type="submit" value="Registrar usuario">
                </div>
            </div>
        </div>
    </form>`;
} else {
    console.error('No se encontró el elemento con el ID "fondo".');
}
