// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  if (navbarInput && navbarBtn) {
    function filtrarHome() {
      const valor = (navbarInput.value || '').toLowerCase().trim();
      document.querySelectorAll('.destino-card, .card-content, .destacados .section-title').forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(valor) ? '' : 'none';
      });
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
