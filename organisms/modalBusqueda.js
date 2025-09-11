// Organism: Modal de búsqueda
import { Buscador } from '../molecules/buscador.js';
import { CardTour } from '../molecules/cardTour.js';
import { CardDestino } from '../molecules/cardDestino.js';

export function ModalBusqueda({ value, tours, destinos, onBuscar, onCerrar }) {
  const modal = document.createElement('div');
  modal.className = 'modal-busqueda';
  modal.appendChild(Buscador({ value, onBuscar, onCerrar }));

  // Mostrar resultados siempre, aunque el input esté vacío
  if (tours.length > 0) {
  const h3 = document.createElement('h3');
  h3.textContent = 'Resultados de tours:';
  h3.className = 'titulo-resultados';
  modal.appendChild(h3);
    const grid = document.createElement('div');
    grid.className = 'resultados-grid';
    tours.forEach(tour => grid.appendChild(CardTour(tour)));
    modal.appendChild(grid);
  }
  if (destinos.length > 0) {
  const h3 = document.createElement('h3');
  h3.textContent = 'Resultados de destinos:';
  h3.className = 'titulo-resultados';
  modal.appendChild(h3);
    const grid = document.createElement('div');
    grid.className = 'resultados-grid';
    destinos.forEach(destino => grid.appendChild(CardDestino(destino)));
    modal.appendChild(grid);
  }
  if (tours.length === 0 && destinos.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No se encontraron resultados.';
    p.style.textAlign = 'center';
    p.style.color = '#2d3a4b';
    p.style.fontSize = '1.2rem';
    p.style.marginTop = '32px';
    modal.appendChild(p);
  }
  return modal;
}
