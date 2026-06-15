// RIPPLE EFFECT - Efecto de ondas al hacer click
// Autor: Aislado del efecto original de prubasdeA.html

class RippleEffect {
  constructor(selector) {
    this.buttons = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.buttons.forEach((button) => {
      // Agregar clase ripple-button si no la tiene
      if (!button.classList.contains('ripple-button')) {
        button.classList.add('ripple-button');
      }

      // Crear el elemento de fondo si no existe
      if (!button.querySelector('.ripple-bg')) {
        const bg = document.createElement('span');
        bg.className = 'ripple-bg';
        button.appendChild(bg);
      }

      // Agregar event listener
      button.addEventListener('click', (e) => this.createRipple(e));
    });
  }

  createRipple(event) {
    const button = event.currentTarget;
    const bg = button.querySelector('.ripple-bg');

    // Remover la clase active si existe
    bg.classList.remove('active');
    
    // Forzar reflow para que se aplique el cambio
    void bg.offsetWidth;
    
    // Agregar la clase para disparar la animación
    bg.classList.add('active');
    
    // Remover la clase después de que termine la animación
    setTimeout(() => {
      bg.classList.remove('active');
    }, 1000);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Aplicar a todos los elementos con clase 'ripple-button'
  // O a un selector específico como '.nav-link'
  new RippleEffect('.ripple-button');
});
