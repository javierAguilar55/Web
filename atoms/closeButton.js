// Atom: Close Button
export function CloseButton({ onClick, className }) {
  const btn = document.createElement('button');
  btn.className = className || 'cerrar-modal-x';
  btn.innerHTML = '&times;';
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}
