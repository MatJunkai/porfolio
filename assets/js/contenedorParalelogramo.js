function initContenedoresGaleria() {
  const galeria = document.getElementById('miGaleria');
  const contenedores = document.querySelectorAll('.contenedor-inclinado');

  if (!galeria || contenedores.length === 0) return;

  function cerrarTodos() {
    contenedores.forEach(contenedor => {
      contenedor.classList.remove('activo');
      contenedor.style.flex = '';
      const containerImg = contenedor.querySelector('.containerImg');
      if (containerImg) containerImg.style.display = 'none';
    });

    galeria.classList.remove('fijado');
  }

  function mostrarContenedor(contenedor) {
    contenedores.forEach(c => {
      c.classList.remove('activo');
      c.style.flex = '';
      const otroContainer = c.querySelector('.containerImg');
      if (otroContainer) otroContainer.style.display = 'none';
    });

    contenedor.classList.add('activo');
    contenedor.style.flex = '0 0 100%';
    galeria.classList.add('fijado');

    const miContainerImg = contenedor.querySelector('.containerImg');
    if (miContainerImg) miContainerImg.style.display = 'grid';
  }

  contenedores.forEach(contenedor => {
    contenedor.addEventListener('click', function (e) {
      e.stopPropagation();
      if (this.classList.contains('activo')) return;
      mostrarContenedor(this);
    });
  });

  if (!window.__contenedoresGaleriaClickGuard) {
    document.addEventListener('click', function (e) {
      const dentroDelContenedor = e.target.closest('.contenedor-inclinado');
      const dentroDelLightbox = e.target.closest('.lightbox-overlay') || e.target.closest('.lightbox');

      if (dentroDelLightbox) return;
      if (dentroDelContenedor) return;

      cerrarTodos();
    });
    window.__contenedoresGaleriaClickGuard = true;
  }
}

window.initContenedoresGaleria = initContenedoresGaleria;

// Sobrescribir la función de inicialización para agregar el botón de cierre
const originalInitLightbox = initLightbox;

function initLightboxEnhanced() {
  originalInitLightbox();

  // Agregar funcionalidad al botón de cierre
  const closeBtn = document.querySelector('.lightbox-close');
  const overlay = document.getElementById('lightbox-overlay');

  if (closeBtn && overlay && !closeBtn.dataset.lightboxCloseBound) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      overlay.classList.remove('lightbox-active');
    });
    closeBtn.dataset.lightboxCloseBound = 'true';
  }

  // Detener propagación en la imagen para evitar cerrar al clickear en ella
  const lightboxImg = document.getElementById('lightbox-image');
  if (lightboxImg && !lightboxImg.dataset.lightboxImgBound) {
    lightboxImg.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    lightboxImg.dataset.lightboxImgBound = 'true';
  }
}

window.initLightbox = initLightboxEnhanced;

// Inicializar el lightbox y la galería cuando el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initContenedoresGaleria();
    initLightbox();
  });
} else {
  initContenedoresGaleria();
  initLightbox();
}
