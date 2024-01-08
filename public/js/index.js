const formNewUser = document.getElementById('guardarUsuario');
const nameUser = document.getElementById('nameUser');

formNewUser.addEventListener('submit', (e) => {
    e.preventDefault()

    if (nameUser.value) {
        socket.emit('nuevo registro', nameUser.value)
        nameUser.value = ''
    }
})