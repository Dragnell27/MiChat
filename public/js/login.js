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