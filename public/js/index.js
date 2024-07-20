const modal = document.getElementById('form-modal');
const btnOpen = document.getElementById('open-form');
const btnClose = document.getElementById('close-form');
const tModal = document.getElementById('t-modal');


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