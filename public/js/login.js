const contenedor = document.getElementById('fondo');
const contentMsg = document.getElementById('contentMsg');
const formModal = document.getElementById('register');

// Elementos para el modal
const modal = document.getElementById('form-modal');
const btnOpen = document.getElementById('open-form');
const btnClose = document.getElementById('close-form');
const tModal = document.getElementById('register');

//
const login = document.getElementById('li-login');
const logout = document.getElementById('li-logout');
const nameUser = document.getElementById('name_user');

btnOpen.addEventListener('click', () => {
    modal.classList.toggle('form-close')
    tModal.classList.toggle('transition-modal')
})
btnClose.addEventListener('click', () => {
    tModal.classList.toggle('transition-modal')
    setTimeout(() => {
        modal.classList.toggle('form-close')
    }, 800);
})

formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameUser = document.getElementById('nameUser');
    const password = document.getElementById('password');

    const datos = {
        user: nameUser.value,
        password: password.value
    }

    if (nameUser.value === '' || password.value === '') {
        alert('Todos los campos son obligatorios');
        return false;
    } else {
        socket.emit('newRegister', datos)
    }
})


function eliminarMensajes() {
    if (contentMsg.childNodes.length > 0) {
        contentMsg.removeChild(contentMsg.childNodes[0]);
    }
}

setInterval(eliminarMensajes, 2000);

socket.on('Welcome', (datosUser) => {
    localStorage.setItem('user', datosUser['user']);

    tModal.classList.toggle('transition-modal')
    setTimeout(() => {
        modal.classList.toggle('form-close')
    }, 800);

    setTimeout(function () {
        alertPersonalizado(datosUser['msg']);
    }, 1000);

    logout.classList.remove('close');
    login.classList.add('close');

    setTimeout(function () {
        const user = localStorage.getItem('user');
        nameUser.textContent = user;
    }, 1200);
});

function alertPersonalizado(msg) {
    const msgNotification = `<li id="myModal" class="modal">` + msg + `</li>`;
    contentMsg.insertAdjacentHTML('beforeend', msgNotification);
}