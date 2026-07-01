// inicializador reutilizable para el lightbox
// definition
function initLightbox() {
    const links = document.querySelectorAll('.lightbox-link');
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');
    if (!overlay || !lightboxImg) return;

    // limpiar listeners viejos: establecer onclick nulo y reemplazar enlaces
    overlay.onclick = null;

    links.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            
            // Buscar la descripción en el div padre (divImg)
            const divImg = this.closest('.divImg');
            let description = '';
            
            if (divImg) {
                const spanDesc = divImg.querySelector('.container-span-description span');
                if (spanDesc) {
                    description = spanDesc.textContent.trim();
                }
            }
            
            // actualizar la imagen del lightbox
            if (lightboxImg) {
                lightboxImg.src = imgSrc;
                lightboxImg.alt = 'Imagen ampliada';
                lightboxImg.style.display = 'block';
                lightboxImg.style.opacity = '1';
            }
            
            // actualizar la descripción del lightbox
            if (lightboxDescription) lightboxDescription.textContent = description;
            
            overlay.classList.add('lightbox-active');
        });
    });

    overlay.addEventListener('click', function() {
        this.classList.remove('lightbox-active');
    });
}

window.initLightbox = initLightbox;