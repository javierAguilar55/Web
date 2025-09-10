// Página: inicialización de componentes en Home
import { renderToursDynamic } from '../organisms/tours-dynamic.js';
import { setupCarousel } from '../organisms/carousel.js';
import { setupTestimonialSlider } from '../organisms/testimonial-slider.js';

// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  
  
  const carousel = document.querySelector('.carousel');
  if (carousel) setupCarousel(carousel);

  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) setupTestimonialSlider(testimonialSlider);

  // Redireccionar los botones de Reserva Ahora a reservas.html
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const type = this.dataset.type;
      const name = this.dataset.name;
      if (!type || !name) return;
      window.location.href = `pages/reservas.html?tipo=${type}&${type}=${encodeURIComponent(name)}`;
    });
  });

  // Cargar tours dinámicos manteniendo atomic design
  renderToursDynamic('tours-list-dinamica', '../assets/data/tours.json');
});

// Buscador solo desde el modal y lupa
const openSearchModalBtn = document.getElementById('open-search-modal');
const modalBg = document.getElementById('modal-busqueda-bg');
const modal = document.getElementById('modal-busqueda');
const navbarInput = modal ? modal.querySelector('.navbar-search') : null;
const navbarBtn = modal ? modal.querySelector('.navbar-search-btn') : null;

function normalizar(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/gi, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

function filtrarHome() {
    if (!navbarInput) return;
    const valor = normalizar(navbarInput.value || '');
    Promise.all([
      fetch('../assets/data/tours.json').then(res => res.json()),
      fetch('../assets/data/destinos.json').then(res => res.json())
    ]).then(([tours, destinos]) => {
      const encontradosTours = tours.filter(tour => {
        const nombre = normalizar(tour.nombre);
        const descripcion = normalizar(tour.descripcion);
        return valor ? (nombre.includes(valor) || descripcion.includes(valor)) : false;
      });
      const encontradosDestinos = destinos.filter(destino => {
        const nombre = normalizar(destino.nombre);
        const descripcion = normalizar(destino.descripcion);
        return valor ? (nombre.includes(valor) || descripcion.includes(valor)) : false;
      });
      let html = '';
      html += `<button class='cerrar-modal' title='Cerrar'>&times;</button>`;
      html += `<input type="text" class="input navbar-search" placeholder="Buscar tour o destino" value="${navbarInput.value.replace(/"/g, '&quot;')}" />`;
      html += `<button class="btn navbar-search-btn">Buscar</button>`;
      if (valor) {
        if (encontradosTours.length > 0) {
          html += '<h3 style="margin-bottom:16px">Resultados de tours:</h3>' + `<div class='resultados-grid'>` + encontradosTours.map(tour => `
            <div class="tour-card atom">
              <img src="${tour.imagen}" alt="${tour.nombre}" style="max-width:220px;" />
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
          `).join('') + `</div>`;
        }
        if (encontradosDestinos.length > 0) {
          html += '<h3 style="margin-bottom:16px">Resultados de destinos:</h3>' + `<div class='resultados-grid'>` + encontradosDestinos.map(destino => `
            <div class="destino-card atom">
              <img src="${destino.imagen}" alt="${destino.nombre}" style="max-width:220px;" />
              <div class="destino-card-content">
                <h3 class="destino-nombre">${destino.nombre}</h3>
                <p class="destino-descripcion">${destino.descripcion}</p>
                <div class="destino-meta">
                  <span>${destino.duracion}</span>
                </div>
                <button class="destino-btn">Reserva Ahora</button>
              </div>
            </div>
          `).join('') + `</div>`;
        }
        if (encontradosTours.length === 0 && encontradosDestinos.length === 0) {
          html += '<p style="text-align:center;color:#2d3a4b;font-size:1.2rem;margin-top:32px;">No se encontraron resultados.</p>';
        }
      }
      modal.innerHTML = html;
      // Reasignar elementos y eventos
      const cerrarBtn = modal.querySelector('.cerrar-modal');
      const nuevoInput = modal.querySelector('.navbar-search');
      const nuevoBtn = modal.querySelector('.navbar-search-btn');
      // Botones de reserva
      modal.querySelectorAll('.tour-btn, .destino-btn').forEach(btn => {
        btn.onclick = function() {
          const card = btn.closest('.tour-card, .destino-card');
          let tipo = card.classList.contains('tour-card') ? 'tour' : 'destino';
          let nombre = card.querySelector('h3').textContent;
          window.location.href = `pages/reservas.html?tipo=${tipo}&${tipo}=${encodeURIComponent(nombre)}`;
        };
      });
      if (cerrarBtn) {
        cerrarBtn.onclick = () => {
          modalBg.style.display = 'none';
          navbarInput.value = '';
        };
      }
      if (nuevoBtn) {
        nuevoBtn.onclick = () => {
          navbarInput.value = nuevoInput.value;
          filtrarHome();
        };
      }
      if (nuevoInput) {
        nuevoInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            navbarInput.value = nuevoInput.value;
            filtrarHome();
          }
        });
        nuevoInput.focus();
      }
    });
}

if (openSearchModalBtn && modalBg && modal && navbarInput && navbarBtn) {
  openSearchModalBtn.addEventListener('click', () => {
    modalBg.style.display = 'flex';
    navbarInput.focus();
  });
  // Cerrar modal al hacer click fuera del modal
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
      modalBg.style.display = 'none';
      navbarInput.value = '';
    }
  });
  // Buscar al hacer click en el botón
  navbarBtn.onclick = filtrarHome;
  // Buscar al presionar Enter en el input
  navbarInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      filtrarHome();
    }
  });
}
