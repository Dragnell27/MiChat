import { alertPersonalizado } from './messages.js';
const login = document.getElementById('li-login');
const logout = document.getElementById('li-logout');
const btn_logout = document.getElementById('btn-logout');
const nameUser = document.getElementById('name_user');

function checkLocalStorageItem() {
    if (localStorage.getItem('user')) {
        const user = localStorage.getItem('user');
        alertPersonalizado('Bienvenido de nuevo '+ user);
        logout.classList.toggle('close');
        login.classList.toggle('close');
        nameUser.textContent = user;
        socket.emit('login', user);
    } else {
        alertPersonalizado('Inicia sesión para enviar mensajes.');
    }
}

btn_logout.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'http://localhost/MiChat/public/';
});

checkLocalStorageItem();