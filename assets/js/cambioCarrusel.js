const visibility = document.querySelector("container-main-carousel");

function mostrarCarrusel () {
    visibility.classList.toggle('carousel-opacity');
    addEventListener('click',mostrarCarrusel);
}