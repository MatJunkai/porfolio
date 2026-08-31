document.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.getElementById('sideNav');
    const imgMenu = document.getElementById('botonImg');
    const menuButton = document.querySelector('.botonAbrirMenu');

    if (!sideNav || !imgMenu || !menuButton) return;

    const setButtonIcon = (isOpen) => {
        imgMenu.src = isOpen
            ? 'assets/img/logo-menu/hamburger-open.png'
            : 'assets/img/logo-menu/hamburger-close.png';
    };  

    menuButton.addEventListener('click', () => {
        const isOpen = sideNav.classList.toggle('open');
        setButtonIcon(isOpen);
    });

    setButtonIcon(false);
});