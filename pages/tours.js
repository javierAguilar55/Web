// Página: inicialización de búsqueda y tarjetas en Tours
import { setupSearchBar } from '../molecules/search-bar.js';
import { setupTourCard } from '../molecules/tour-card.js';
import { ModalInfoTour } from '../organisms/modalInfo.js';

document.addEventListener('DOMContentLoaded', () => {


  // Filtros robustos para tours
  const searchInput = document.querySelector('.tour-filters-input');
  const selects = document.querySelectorAll('.tour-filters-select');
  const form = document.querySelector('.tour-filters');

  function normalizar(str) {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function getDificultad(card) {
    const badge = card.querySelector('.tour-badge');
    if (!badge) return '';
    const txt = normalizar(badge.textContent);
    if (txt.includes('facil')) return 'facil';
    if (txt.includes('fácil')) return 'facil';
    if (txt.includes('moderado')) return 'media';
    if (txt.includes('desafiante')) return 'dificil';
    return '';
  }

  function getDuracion(card) {
    // Busca el primer span de .tour-meta que contenga un número
    const spans = card.querySelectorAll('.tour-meta span');
    for (let s of spans) {
      const match = s.textContent.match(/(\d+)/);
      if (match) return parseInt(match[1]);
    }
    return 0;
  }

  function filtrarToursRobusto() {
    const texto = normalizar(searchInput?.value || '').trim();
    const dificultad = selects[0]?.value;
    const duracion = selects[1]?.value;
    document.querySelectorAll('.tour-card').forEach(card => {
      let mostrar = true;
      // Filtro por texto
      if (texto) {
        const titulo = normalizar(card.querySelector('h3')?.textContent || '');
        const desc = normalizar(card.querySelector('p')?.textContent || '');
        if (!titulo.includes(texto) && !desc.includes(texto)) mostrar = false;
      }
      // Filtro por dificultad
      if (mostrar && dificultad) {
        if (getDificultad(card) !== dificultad) mostrar = false;
      }
      // Filtro por duración
      if (mostrar && duracion) {
        const dias = getDuracion(card);
        if (duracion === 'corta' && dias !== 1) mostrar = false;
        if (duracion === 'media' && (dias < 2 || dias > 3)) mostrar = false;
        if (duracion === 'larga' && dias < 4) mostrar = false;
      }
      card.style.display = mostrar ? '' : 'none';
    });
  }

  // Solo filtrar al hacer submit (botón o Enter)
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    filtrarToursRobusto();
  });


  // Mostrar modal al hacer clic en la tarjeta (excepto botón Reservar)
  document.querySelectorAll('.tour-card').forEach(card => {
    setupTourCard(card);
    card.addEventListener('click', function(e) {
      // No abrir modal si el click fue en el botón Reservar
      if (e.target.closest('.tour-btn')) return;
      const nombre = card.querySelector('h3')?.textContent || '';
      const desc = card.querySelector('p')?.textContent || '';
      const imgSrc = card.querySelector('img')?.src || '';
      const precio = card.querySelector('.tour-price')?.textContent || '';
      // Extra info
      let duracion = '';
      let dificultad = '';
      const badge = card.querySelector('.tour-badge');
      if (badge) {
        dificultad = badge.textContent.trim();
      }
      const metaSpans = card.querySelectorAll('.tour-meta span');
      if (metaSpans.length > 0) {
        duracion = metaSpans[0].textContent.trim();
      }
      ModalInfoTour({ nombre, desc, imgSrc, precio, info: '', duracion, dificultad });
    });
  });

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
