import { alertPersonalizado } from './messages.js';

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

socket.on('Welcome', (datosUser) => {

    if (datosUser['status'] == 'REGISTER' || datosUser['status'] == 'OK') {
        localStorage.setItem('user', datosUser['user']);

        logout.classList.remove('close');
        login.classList.add('close');

        tModal.classList.toggle('transition-modal')
        setTimeout(() => {
            modal.classList.toggle('form-close')
        }, 800);

        setTimeout(function () {
            alertPersonalizado(datosUser['msg']);
        }, 1000);

        setTimeout(function () {
            const user = localStorage.getItem('user');
            nameUser.textContent = user;
        }, 1200);
        return
    }
    console.log(datosUser['msg']);
});