// Molecule: Buscador
import { Input } from '../atoms/input.js';
import { Button } from '../atoms/button.js';
import { CloseButton } from '../atoms/closeButton.js';

export function Buscador({ value, onBuscar, onCerrar }) {
  const row = document.createElement('div');
  row.className = 'buscador-row';
  row.style.display = 'flex';
  row.style.gap = '12px';
  row.style.width = '100%';
  row.style.justifyContent = 'center';
  row.style.alignItems = 'center';
  row.style.position = 'relative';

  const input = Input({
    value,
    placeholder: 'Buscar tour o destino',
    className: 'input navbar-search',
    onInput: (e) => {
      input.value = e.target.value;
      if (typeof onBuscar === 'function') onBuscar(e);
    }
  });
  // Forzar el valor actual en cada render
  setTimeout(() => { input.value = value || ''; }, 0);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && typeof onBuscar === 'function') onBuscar(e);
  });
  const buscarBtn = Button({ text: 'Buscar', className: 'btn navbar-search-btn', onClick: onBuscar });
  const cerrarBtn = CloseButton({ onClick: onCerrar, className: 'cerrar-modal-x' });
  cerrarBtn.style.position = 'absolute';
  cerrarBtn.style.top = '-18px';
  cerrarBtn.style.right = '-18px';
  cerrarBtn.style.background = '#ff6b3d';
  cerrarBtn.style.color = '#fff';
  cerrarBtn.style.border = 'none';
  cerrarBtn.style.borderRadius = '50%';
  cerrarBtn.style.width = '38px';
  cerrarBtn.style.height = '38px';
  cerrarBtn.style.fontSize = '1.7rem';
  cerrarBtn.style.cursor = 'pointer';
  cerrarBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';

  row.appendChild(input);
  row.appendChild(buscarBtn);
  row.appendChild(cerrarBtn);
  return row;
}
