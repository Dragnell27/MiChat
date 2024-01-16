const contenedor = document.getElementById('fondo');
const contentMsg = document.getElementById('contentMsg');

function eliminarMensajes() {
    if (contentMsg.childNodes.length > 0) {
        contentMsg.removeChild(contentMsg.childNodes[0]);
    }
}

setInterval(eliminarMensajes, 2000);

socket.on('inicio exitoso', (datosUser) => {
    sessionStorage.setItem('newUser', datosUser['user']);
    contenedor.innerHTML = `<div class="contenido">
    <ul id="mensajes"></ul>
    <form id="form">
        <input type="text" id="input" autocomplete="off" placeholder="Nuevo mensaje">
        <button type="submit" id="Enviar">Enviar</button>
    </form>
</div>`;
    console.log(sessionStorage.getItem('newUser'));
    const script = document.getElementById('scriptMensajes');
    script.src = '../js/mensajes.js';
    setTimeout(function () {
        alertPersonalizado(datosUser['msg']);
    }, 500);
});

function alertPersonalizado(msg) {
    const msgNotification = `<li id="myModal" class="modal">` + msg + `</li>`;
    contentMsg.insertAdjacentHTML('beforeend', msgNotification);
}

if (contenedor && sessionStorage.getItem('newUser') == null) {
    const elemento =
        `<div>
            <button id="btnRegistrarse">Registrarse</button>
            <button>Iniciar sesión</button>
        </div>`;
    contenedor.innerHTML = elemento;

    const btnRegistrase = document.getElementById('btnRegistrarse');
    btnRegistrase.addEventListener('click', () => {
        contenedor.innerHTML = registro;
        agregarScriptEventos();
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
    const scriptMsg  = document.getElementById('scriptMensajes');
    contenedor.innerHTML = `<div class="contenido">
    <ul id="mensajes"></ul>
    <form id="form">
        <input type="text" id="input" autocomplete="off" placeholder="Nuevo mensaje">
        <button type="submit" id="Enviar">Enviar</button>
    </form>
    </div>`;
    scriptMsg.src = '../js/mensajes.js';
}

function agregarScriptEventos() {
    const nuevoScript = document.getElementById('eventos');
    if (nuevoScript) {
        nuevoScript.parentNode.removeChild(nuevoScript);
    }

    const scriptEventos = document.createElement('script');
    scriptEventos.id = 'eventos';
    scriptEventos.innerHTML = `const formNewUser = document.getElementById('guardarUsuario');
            formNewUser.addEventListener('submit', (e) => {
                const nameUser = document.getElementById('nameUser');
                const passUser = document.getElementById('passUser');

                var datos = {
                    "passUser" : passUser.value,
                    "nameUser" : nameUser.value
                }
                e.preventDefault();
                if (nameUser.value && passUser.value) {
                    socket.emit('nuevo registro', datos);
                    nameUser.value = '';
                    passUser.value = '';
                }
            });`;
    document.body.appendChild(scriptEventos);
}