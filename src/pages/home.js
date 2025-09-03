// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  if (navbarInput && navbarBtn) {
    function normalizar(str) {
      return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
    function filtrarHome() {
      const valor = normalizar(navbarInput.value || '').trim();
      const cards = document.querySelectorAll('.destino-card, .tour-card');
      cards.forEach(card => {
        let texto = normalizar(card.textContent);
        const img = card.querySelector('img');
        if (img) {
          if (img.alt) texto += ' ' + normalizar(img.alt);
          if (img.src) texto += ' ' + normalizar(img.src);
        }
        card.style.display = texto.includes(valor) ? '' : 'none';
      });
      if (!valor) {
        cards.forEach(card => card.style.display = '');
      }
    }
    navbarBtn.onclick = filtrarHome;
    navbarInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') filtrarHome();
    });
  }
});
// Página: inicialización de componentes en Home
import { setupCarousel } from '../organisms/carousel.js';
import { setupTestimonialSlider } from '../organisms/testimonial-slider.js';

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (carousel) setupCarousel(carousel);

  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) setupTestimonialSlider(testimonialSlider);

  // Redireccionar los botones de Reserva Ahora a reservas.html
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.onclick = function() {
      window.location.href = 'reservas.html';
    };
  });
});
