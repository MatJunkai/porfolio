// inicializador reutilizable para el lightbox
// definition
function initLightbox() {
    const links = document.querySelectorAll('.lightbox-link');
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-image');
    if (!overlay || !lightboxImg) return;

    // limpiar listeners viejos: establecer onclick nulo y reemplazar enlaces
    overlay.onclick = null;

    links.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            // actualizar la misma imagen que hay en el DOM
            const imgEl = document.getElementById('lightbox-image');
            if (imgEl) imgEl.src = imgSrc;
            overlay.classList.add('lightbox-active');
        });
    });

    overlay.addEventListener('click', function() {
        this.classList.remove('lightbox-active');
    });
}

window.initLightbox = initLightbox;