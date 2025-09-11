// Organism: destinos-dynamic.js
// Carga y renderiza destinos en formato atomic design desde destinos.json

export function renderDestinosDynamic(containerId, jsonPath) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(destinos => {
      const contenedor = document.getElementById(containerId);
      if (!contenedor) return;
      contenedor.innerHTML = destinos.map(destino => `
        <div class="destino-card atom">
          <img src="${destino.imagen}" alt="${destino.nombre}" />
          <div class="destino-card-content">
            <h3 class="destino-nombre">${destino.nombre}</h3>
            <p class="destino-descripcion">${destino.descripcion}</p>
            <div class="destino-meta">
              <span>${destino.duracion}</span>
              <span class="destino-price">${destino.precio}</span>
            </div>
            <button class="destino-btn">Reserva Ahora</button>
          </div>
        </div>
      `).join('');
      // Redireccionar los botones de Reserva Ahora a reservas.html
      contenedor.querySelectorAll('.destino-btn').forEach(btn => {
        btn.onclick = function() {
          window.location.href = 'reservas.html';
        };
      });
    });
}
