const form = document.getElementById('form')
const input = document.getElementById('input')
const mensajes = document.getElementById('mensajes')

socket.on('mensaje nuevo', (msg) => {
    const item = `<li id= "recibidos">${msg}</li>`;
    mensajes.insertAdjacentHTML('beforeend', item);
});

socket.on('mensaje propio', (msg) => {
    const item = `<li id="propio">${msg}</li>`;
    mensajes.insertAdjacentHTML('beforeend', item);
});

socket.on('Nuevo usuario conectado',(msg) => {
    alertPersonalizado(msg);
});

function alertPersonalizado(msg){
    const msgNotification = `<li id="myModal" class="modal">`+msg+`</li>`;
    contentMsg.insertAdjacentHTML('beforeend', msgNotification);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit('mensaje nuevo', input.value)
        input.value = ''
    }
})