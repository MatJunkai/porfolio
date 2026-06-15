/*funcion que crea la clase para cargar la seccion en index, aplicando la classe secccion-include a la clase container-include-seccion, y luego eliminando la clase para que se pueda volver a cargar la seccion cada vez que se haga click en el boton de cada seccion, faltaria la funcion para cambiar entre una y otra dependiendo de la seccion que seleccione
*/

// const mostrarSeccion = document.querySelector(".container-include-seccion");
// function incluirSeccion (){
//     mostrarSeccion.classList.add('seccion-include');
//     mostrarSeccion.classList.remove('seccion-include');

//     addEventListener('click',incluirSeccion);
// }
// incluirSeccion();

// referencia al contenedor donde se inyectará el HTML
const mainContainer = document.querySelector('#main-content');
if (!mainContainer) {
    console.error('Elemento #main-content no encontrado en el DOM');
}
const links = document.querySelectorAll('.nav-link');

// Función principal para cargar contenido
async function cargarSeccion(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Archivo no encontrado");
        const html = await respuesta.text(); // Convertimos la respuesta a texto/html
        mainContainer.innerHTML = html;      // Inyectamos el HTML

    
    // ejecutar scripts que vinieran en el HTML (si los hubiera)
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        tmp.querySelectorAll('script').forEach(old => {
            const s = document.createElement('script');
            if (old.src) s.src = old.src;
            else s.textContent = old.textContent;
            document.body.appendChild(s);
        });

        // *opcional*: llamadas de inicialización específicas
        if (url.endsWith('trabajosHechos.html')) {
            // el carrusel y el lightbox necesitan elementos recién añadidos
            if (typeof window.initCarousel === 'function') window.initCarousel();
            if (typeof window.initLightbox === 'function') window.initLightbox();
        }

    
    
    } catch (error) {
        console.error("Error al cargar la sección:", error);
        mainContainer.innerHTML = "<h2>Error 404</h2><p>No se pudo cargar la página.</p>";
    }
}

// Escuchar clics en el menú
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que la página recargue
        const archivo = link.getAttribute('data-archivo');
        cargarSeccion(archivo);
    });
});

// OPCIONAL: Cargar la página de inicio por defecto al abrir el sitio
window.addEventListener('DOMContentLoaded', () => {
    // mostrar una sección por defecto, ajusta la ruta
    cargarSeccion('src/home.html');
});



