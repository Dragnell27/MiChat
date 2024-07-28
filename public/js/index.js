import { alertPersonalizado } from './messages.js';

const login = document.getElementById('li-login');
const logout = document.getElementById('li-logout');
const btn_logout = document.getElementById('btn-logout');
const nameUser = document.getElementById('name_user');
const user = localStorage.getItem('user');

function checkLocalStorageItem() {
    if (localStorage.getItem('user')) {
        socket.emit('login', user);
    } else {
        alertPersonalizado('Inicia sesión para enviar mensajes.')
    }
}

socket.on('DuplicateSession', (data) => {
    if (data.status == 'SessionFailure'){
        alertPersonalizado('Error: Ya tienes una sesión activa. Inicia sesión en otro navegador con un usuario diferente')
        logout.classList.toggle('close');
        login.classList.toggle('close');
        nameUser.textContent = user;
    }else{
        alertPersonalizado('Bienvenido de nuevo ' + user)
        logout.classList.toggle('close');
        login.classList.toggle('close');
        nameUser.textContent = user;
    }
})

btn_logout.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'http://localhost/MiChat/public/';
});

checkLocalStorageItem();