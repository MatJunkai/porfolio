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
        // Dejar la transición visible antes de cambiar el contenido.
        mainContainer.style.opacity = '0.7';
        mainContainer.style.transform = 'translateY(6px)';

        // Limpiar estado previo de la galería y cerrar el lightbox al cambiar de sección.
        document.querySelectorAll('.galeria-inclinada').forEach(galeria => {
            galeria.classList.remove('fijado');
        });
        document.querySelectorAll('.contenedor-inclinado').forEach(contenedor => {
            contenedor.classList.remove('activo');
            contenedor.style.flex = '';
            const containerImg = contenedor.querySelector('.containerImg');
            if (containerImg) containerImg.style.display = 'none';
        });
        const overlay = document.getElementById('lightbox-overlay');
        if (overlay) overlay.classList.remove('lightbox-active');

        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Archivo no encontrado");
        const html = await respuesta.text(); // Convertimos la respuesta a texto/html
        mainContainer.innerHTML = html;      // Inyectamos el HTML

        // Ejecutar scripts que vinieran en el HTML (si los hubiera).
        // Al volver a cargar la sección, hay que reinyectar los scripts y reinicializar la galería.
        const tmp = document.createElement('div');
        tmp.innerHTML = html;

        document.querySelectorAll('script[data-dynamic-section-script]').forEach(script => script.remove());

        async function loadDynamicScript(old) {
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.setAttribute('data-dynamic-section-script', 'true');

                if (old.src) {
                    s.src = old.src;
                    s.async = false;
                    s.onload = resolve;
                    s.onerror = () => reject(new Error(`Error al cargar script: ${old.src}`));
                } else {
                    s.textContent = old.textContent;
                    resolve();
                }

                document.body.appendChild(s);
            });
        }

        const dynamicScripts = Array.from(tmp.querySelectorAll('script'));
        for (const script of dynamicScripts) {
            await loadDynamicScript(script);
        }

        // Reinit de la galería cuando volvemos a la sección de trabajos para que los nuevos contenedores reciban eventos.
        if (url.endsWith('trabajosHechos.html')) {
            if (typeof window.initContenedoresGaleria === 'function') window.initContenedoresGaleria();
            if (typeof window.initLightbox === 'function') window.initLightbox();
        }

        window.requestAnimationFrame(() => {
            mainContainer.style.opacity = '1';
            mainContainer.style.transform = 'translateY(0)';
        });
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



