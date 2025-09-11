// Atom: Input
export function Input({ value, placeholder, onInput, className }) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = className || 'input';
  input.placeholder = placeholder || '';
  input.value = value || '';
  if (onInput) input.addEventListener('input', onInput);
  return input;
}
