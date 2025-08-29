// Página: validación de formulario de contacto
import { validateInput } from '../atoms/input.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[required], textarea[required]').forEach(input => {
    validateInput(input, input.type);
  });
});
