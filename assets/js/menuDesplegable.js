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

    // Cerrar el sideNav cuando se hace click en cualquiera de sus enlaces
    sideNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            sideNav.classList.remove('open');
            setButtonIcon(false);
        });
    });

    setButtonIcon(false);
});