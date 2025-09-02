// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  // Autocompletar el select de tour si viene por parámetro
  const params = new URLSearchParams(window.location.search);
  const tourParam = params.get('tour') || params.get('destino');
  if (tourParam) {
    const select = document.getElementById('tour');
    if (select) {
      for (const option of select.options) {
        if (option.textContent.trim().toLowerCase() === tourParam.trim().toLowerCase()) {
          option.selected = true;
          break;
        }
      }
    }
  }
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
document.addEventListener('DOMContentLoaded', () => {
  // Mensaje de reserva enviada
  const form = document.querySelector('.reservas-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      mostrarMensajeReserva();
      form.reset();
    });
  }
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
