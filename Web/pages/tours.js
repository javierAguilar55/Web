// Página: inicialización de búsqueda y tarjetas en Tours
import { setupSearchBar } from '../molecules/search-bar.js';
import { setupTourCard } from '../molecules/tour-card.js';

document.addEventListener('DOMContentLoaded', () => {
  // Filtro por búsqueda (filtros de la página)
  const searchInput = document.querySelector('.tour-filters-input');
  if (searchInput) setupSearchBar(searchInput, '.tour-card');

  // Filtro por búsqueda (navbar)
  const navbarInput = document.querySelector('.navbar-tour-search');
  const navbarBtn = document.querySelector('.navbar-tour-search-btn');
  function filtrarPorNavbar() {
    const valor = (navbarInput.value || '').toLowerCase().trim();
    document.querySelectorAll('.tour-card').forEach(card => {
      const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
      if (titulo.includes(valor) || desc.includes(valor)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
  if (navbarInput && navbarBtn) {
    navbarBtn.onclick = filtrarPorNavbar;
    navbarInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') filtrarPorNavbar();
    });
  }

  // Filtros por selects y botón
  const selects = document.querySelectorAll('.tour-filters-select');
  const form = document.querySelector('.tour-filters');
  function normalizar(str) {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  function filtrarTours() {
    const dificultad = selects[0].value;
    const duracion = selects[1].value;
    document.querySelectorAll('.tour-card').forEach(card => {
      let mostrar = true;
      // Filtro por dificultad
      if (dificultad) {
        const badge = card.querySelector('.tour-badge');
        if (badge) {
          const badgeText = normalizar(badge.textContent);
          if (dificultad === 'facil' && !(badgeText.includes('facil') || badgeText.includes('fácil'))) mostrar = false;
          if (dificultad === 'media' && !badgeText.includes('moderado')) mostrar = false;
          if (dificultad === 'dificil' && !badgeText.includes('desafiante')) mostrar = false;
        } else {
          mostrar = false;
        }
      }
      // Filtro por duración
      if (mostrar && duracion) {
        const meta = card.querySelector('.tour-meta span');
        if (meta) {
          const metaText = normalizar(meta.textContent);
          let dias = 0;
          const match = metaText.match(/(\d+)/);
          if (match) dias = parseInt(match[1]);
          if (duracion === 'corta' && dias !== 1) mostrar = false;
          if (duracion === 'media' && (dias < 2 || dias > 3)) mostrar = false;
          if (duracion === 'larga' && dias < 4) mostrar = false;
        } else {
          mostrar = false;
        }
      }
      card.style.display = mostrar ? '' : 'none';
    });
  }
  if (form) form.addEventListener('submit', e => { e.preventDefault(); filtrarTours(); });

  document.querySelectorAll('.tour-card').forEach(setupTourCard);

  // Redireccionar al hacer clic en los botones de reservar
  document.querySelectorAll('.tour-btn').forEach(btn => {
    btn.textContent = 'Reservar';
    btn.onclick = function() {
      const card = btn.closest('.tour-card');
      const nombre = card.querySelector('h3').textContent;
      window.location.href = `reservas.html?tipo=tour&tour=${encodeURIComponent(nombre)}`;
    };
  });
});
