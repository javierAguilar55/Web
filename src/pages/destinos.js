// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  if (navbarInput && navbarBtn) {
    function filtrarDestinos() {
      const valor = (navbarInput.value || '').toLowerCase().trim();
      document.querySelectorAll('.destino-card').forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(valor) ? '' : 'none';
      });
    }
    navbarBtn.onclick = filtrarDestinos;
    navbarInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') filtrarDestinos();
    });
  }
});
// Página: inicialización de componentes en Destinos
import { setupSearchBar } from '../molecules/search-bar.js';
import { setupTourCard } from '../molecules/tour-card.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) setupSearchBar(searchInput, '.destino-card');

  // Filtro por categoría
  const filtroBtns = document.querySelectorAll('.filtro-btn');
  filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filtroBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const categoria = btn.textContent.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      document.querySelectorAll('.destino-card').forEach(card => {
        const cardCat = (card.dataset.category || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (categoria === 'todos' || cardCat === categoria) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  document.querySelectorAll('.destino-card').forEach(setupTourCard);

  // Mostrar información del destino al hacer click en Explorar
  document.querySelectorAll('.destino-btn').forEach(btn => {
    btn.onclick = function() {
      const card = btn.closest('.destino-card');
      const img = card.querySelector('img');
      const nombre = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;
      const info = card.getAttribute('data-info') || '';
      mostrarInfoDestino(nombre, desc, img.src, info);
    };
  });

  function mostrarInfoDestino(nombre, desc, imgSrc, info) {
    let modal = document.createElement('div');
    modal.className = 'info-destino-modal';
    modal.innerHTML = `
      <div class="info-destino-content">
        <h2>${nombre}</h2>
        <p>${desc}</p>
        <div class="info-extra">${info}</div>
        <button class="cerrar-info">Cerrar</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.style.backgroundImage = `url('${imgSrc}')`;
    modal.style.backgroundSize = 'cover';
    modal.style.backgroundPosition = 'center';
    document.querySelector('.cerrar-info').onclick = () => modal.remove();
  }

  // Redireccionar los botones Reservar de cada destino-card
  document.querySelectorAll('.reservar-destino-btn').forEach(btn => {
    btn.onclick = function() {
      window.location.href = 'reservas.html';
    };
  });
});
