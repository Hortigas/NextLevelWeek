const modal = document.querySelector('#modal');
document.querySelector('#modal .header a').addEventListener('click', () => {
    modal.classList.add('hide');
});
document.querySelector('#page-home main a').addEventListener('click', () => {
    modal.classList.remove('hide');
});
