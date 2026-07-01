  // const galeria = document.getElementById('miGaleria');
      // const contenedores = document.querySelectorAll('.contenedor-inclinado');
      // const containerImg = document.querySelector('.containerImg');

      // contenedores.forEach(contenedor => {
      //   contenedor.addEventListener('click', function (e) {
      //     // Si haces click en uno que ya está activo, lo desactiva (toggle)
      //     if (this.classList.contains('activo')) {
      //       this.classList.remove('activo');
      //       galeria.classList.remove('fijado');
      //       containerImg.style.display = 'none'; // Oculta el contenedor de imágenes
      //     } else {
      //       // Limpia la clase 'activo' de todos los hermanos
      //       contenedores.forEach(c => c.classList.remove('activo'));

      //       // Activa el contenedor clickeado y avisa a la galería
      //       this.classList.add('activo');
      //       galeria.classList.add('fijado');
      //       containerImg.style.display = 'grid'; // Muestra el contenedor de imágenes
      //     }
      //   });
      // });
      const galeria = document.getElementById('miGaleria');
      const contenedores = document.querySelectorAll('.contenedor-inclinado');

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

          if (this.classList.contains('activo')) {
            return;
          }

          mostrarContenedor(this);
        });
      });

      document.addEventListener('click', function (e) {
        const dentroDeLaGaleria = e.target.closest('.galeria-inclinada');
        const dentroDelLightbox = e.target.closest('.lightbox-overlay') || e.target.closest('.lightbox');

        if (dentroDelLightbox) return;
        if (dentroDeLaGaleria) return;

        cerrarTodos();
      });
  
  
  
  
  
  // Sobrescribir la función de inicialización para agregar el botón de cierre
      const originalInitLightbox = initLightbox;

      function initLightboxEnhanced() {
        originalInitLightbox();

        // Agregar funcionalidad al botón de cierre
        const closeBtn = document.querySelector('.lightbox-close');
        const overlay = document.getElementById('lightbox-overlay');

        if (closeBtn && overlay) {
          closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            overlay.classList.remove('lightbox-active');
          });

          // Detener propagación en la imagen para evitar cerrar al clickear en ella
          const lightboxImg = document.getElementById('lightbox-image');
          if (lightboxImg) {
            lightboxImg.addEventListener('click', function (e) {
              e.stopPropagation();
            });
          }
        }
      }

      window.initLightbox = initLightboxEnhanced;

      // Inicializar el lightbox cuando el DOM está listo
      document.addEventListener('DOMContentLoaded', function () {
        initLightbox();
      });

      // También llamar directamente por si el DOM ya está cargado
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
      } else {
        initLightbox();
      }