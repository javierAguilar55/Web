// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  if (navbarInput && navbarBtn) {
    function filtrarReservas() {
      const valor = (navbarInput.value || '').toLowerCase().trim();
      document.querySelectorAll('.reserva-card, .reserva-info').forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(valor) ? '' : 'none';
      });
    }
    navbarBtn.onclick = filtrarReservas;
    navbarInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') filtrarReservas();
    });
  }
});
// Página: validación de formulario de reservas
import { validateInput } from '../atoms/input.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[required], textarea[required]').forEach(input => {
    validateInput(input, input.type);
  });

  // Mensaje de reserva enviada
  const form = document.querySelector('.reservas-form form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    mostrarMensajeReserva();
    form.reset();
  });

  function mostrarMensajeReserva() {
    let mensaje = document.createElement('div');
    mensaje.className = 'reserva-mensaje-exito';
    mensaje.textContent = '¡Reserva enviada exitosamente! Nos contactaremos contigo pronto.';
    form.parentElement.appendChild(mensaje);
    setTimeout(() => {
      mensaje.remove();
    }, 3500);
  }
});
