import { alertPersonalizado } from './messages.js';
const login = document.getElementById('li-login');
const logout = document.getElementById('li-logout');
const btn_logout = document.getElementById('btn-logout');
const nameUser = document.getElementById('name_user');

function checkLocalStorageItem() {
    // Verificar si el elemento 'user' existe en localStorage
    if (localStorage.getItem('user')) {
        const user = localStorage.getItem('user');
        alertPersonalizado('Bienvenido de nuevo '+ user);
        logout.classList.toggle('close');
        login.classList.toggle('close');
        nameUser.textContent = user;
    } else {
        // Si no existe, mostrar un mensaje diferente
        alertPersonalizado('Inicia sesión para enviar mensajes.');
    }
}

btn_logout.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'http://localhost/MiChat/public/';
});

checkLocalStorageItem();