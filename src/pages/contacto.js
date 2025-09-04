// Página: validación de formulario de contacto

document.addEventListener('DOMContentLoaded', () => {
  // Mostrar mensaje de envío exitoso después de enviar el formulario
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function() {
      setTimeout(() => {
        let mensaje = document.createElement('div');
        mensaje.className = 'contacto-mensaje-exito';
        mensaje.textContent = '¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo pronto.';
        form.parentElement.appendChild(mensaje);
        setTimeout(() => {
          mensaje.remove();
        }, 3500);
      }, 100);
    });
  }
});
