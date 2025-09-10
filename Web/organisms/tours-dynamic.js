// Organism: tours-dynamic.js
// Carga y renderiza tours en formato atomic design desde tours.json

export function renderToursDynamic(containerId, jsonPath) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(tours => {
      const contenedor = document.getElementById(containerId);
      if (!contenedor) return;
      contenedor.innerHTML = `<div class='tours-grid' style='display:grid;grid-template-columns:repeat(3,1fr);gap:2.2rem;'>` +
        tours.map(tour => `
          <div class="tour-card atom">
            <img src="${tour.imagen}" alt="${tour.nombre}" />
            <div class="tour-card-content">
              <h3 class="tour-nombre">${tour.nombre}</h3>
              <p class="tour-descripcion">${tour.descripcion}</p>
              <div class="tour-meta">
                <span>${tour.duracion}</span>
                <span class="tour-price">${tour.precio}</span>
              </div>
              <button class="tour-btn">Reserva Ahora</button>
            </div>
          </div>
        `).join('') + '</div>';
      // Redireccionar los botones de Reserva Ahora a reservas.html
      contenedor.querySelectorAll('.tour-btn').forEach(btn => {
        btn.onclick = function() {
          window.location.href = 'reservas.html';
        };
      });
    });
}
