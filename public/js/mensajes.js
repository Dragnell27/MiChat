const form = document.getElementById('form')
const input = document.getElementById('input')
const mensajes = document.getElementById('mensajes')

socket.on('mensaje nuevo', (msg) => {
    const item = `
    <div class="r-container-msg">
            <div class="r-container-msg-div">
                <div class="received-messages msg">
                    <div>
                    <p class="name-user"><span class="name-span">@</span>${msg.user}</p>
                    <p>${msg.text}</p>
                    </div>
                </div>
            </div>
        </div>`;
    mensajes.insertAdjacentHTML('beforeend', item);
});

socket.on('mensaje propio', (msg) => {
    const item = `
        <div class="container-msg">
            <div class="container-msg-div">
                <div class="my-messages msg">
                    <div>
                    <p class="name-user">Tú</p>
                    <p>${msg}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    mensajes.insertAdjacentHTML('beforeend', item);
    mensajes.scrollTop = mensajes.scrollHeight;
});

socket.on('Nuevo usuario conectado', (msg) => {
    alertPersonalizado(msg);
});

function alertPersonalizado(msg) {
    const msgNotification = `<li id="myModal" class="modal">` + msg + `</li>`;
    contentMsg.insertAdjacentHTML('beforeend', msgNotification);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = 'User1'
    const msg = {
        user: user,
        text: input.value
    }
    if (input.value) {
        socket.emit('newMessage', msg)
        input.value = ''
    }
})