// Molecule: Card Destino
export function CardDestino(destino) {
  const card = document.createElement('div');
  card.className = 'modal-destino-card atom';
  let imgSrc = destino.imagen;
  if (imgSrc.startsWith('../assets/')) {
    imgSrc = imgSrc.replace('../assets/', 'assets/');
  }
  card.innerHTML = `
    <img src="${imgSrc}" alt="${destino.nombre}" style="max-width:220px;" />
    <div class="modal-destino-card-content">
      <h3 class="modal-destino-nombre">${destino.nombre}</h3>
      <p class="modal-destino-descripcion">${destino.descripcion}</p>
      <div class="modal-destino-meta">
        <span>${destino.duracion}</span>
      </div>
      <button class="modal-destino-btn">Reserva Ahora</button>
    </div>
  `;
  return card;
}
