// Página: validación de formulario de contacto

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona solo el formulario de contacto de manera específica
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      mostrarMensajeContacto();
      form.reset();
    });
  }

  function mostrarMensajeContacto() {
    let mensaje = document.createElement('div');
    mensaje.className = 'contacto-mensaje-exito';
    mensaje.textContent = '¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo pronto.';
    form.parentElement.appendChild(mensaje);
    setTimeout(() => {
      mensaje.remove();
    }, 3500);
  }
});
