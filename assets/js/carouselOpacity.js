const aplicarEstilo = document.querySelector($opacityCarousel);

function mostrarCarrusel () {
    aplicarEstilo.clasList.toggle('carousel-opacity');
}
aplicarEstilo.addEventListener('click',mostrarCarrusel);
// faltaria la funcion para cambiar entre una y otra dependiendo de la seccion que seleccione
// 1. seccion dibujos/diseños
// 2. seccion paginas web hechas

