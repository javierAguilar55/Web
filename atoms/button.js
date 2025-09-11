// Atom: Button
export function Button({ text, className, onClick }) {
  const btn = document.createElement('button');
  btn.className = className || 'btn';
  btn.textContent = text || '';
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}
