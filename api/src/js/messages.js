const form = document.getElementById('form')
const input = document.getElementById('input')
const mensajes = document.getElementById('mensajes')
const contentMsg = document.getElementById('contentMsg');

function eliminarMensajes() {
    if (contentMsg.childNodes.length > 0) {
        contentMsg.removeChild(contentMsg.childNodes[0]);
    }
}

setInterval(eliminarMensajes, 2500);

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

socket.on('NewUserConnected', (msg) => {
    alertPersonalizado(msg);
});

export function alertPersonalizado(msg) {
    const msgNotification = `<li id="myModal" class="modal">` + msg + `</li>`;
    contentMsg.insertAdjacentHTML('beforeend', msgNotification);
}

// Registrar el listener una sola vez
socket.on('msg-DuplicateSession', (data) => {
    if (data.status == 'SessionFailure') {
        alertPersonalizado('Error: Ya tienes una sesión activa. Inicia sesión en otro navegador con un usuario diferente')
        input.value = ''
    } else {
        input.value = ''
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const m_user = localStorage.getItem('user');
    const msg = {
        user: m_user,
        text: input.value
    }

    if (!localStorage.getItem('user')) {
        alertPersonalizado('Inicia sesión para enviar mensajes.');
        return;
    }
    if (input.value) {
        socket.emit('newMessage', msg);
    }
});
