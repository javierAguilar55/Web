// Molecule: Card Tour
export function CardTour(tour) {
  const card = document.createElement('div');
  card.className = 'tour-card';
  let imgSrc = tour.imagen || '';
  if (imgSrc.startsWith('../')) {
    imgSrc = imgSrc.replace('../', '');
  }
  card.innerHTML = `
    <img src="${imgSrc}" alt="${tour.nombre}" />
    <div class="tour-card-content">
      <div class="tour-nombre">${tour.nombre}</div>
      <div class="tour-descripcion">${tour.descripcion}</div>
      <div class="tour-meta">
        <span>${tour.duracion}</span>
        <span class="tour-price">${tour.precio}</span>
      </div>
      <button class="tour-btn">Reserva Ahora</button>
    </div>
  `;
  return card;
}
