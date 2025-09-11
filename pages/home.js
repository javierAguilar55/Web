import { setupNavbar } from '../organisms/navbar.js';
// Botones "Reserva Ahora" en index.html (modal y cards)
document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa robusto usando setupNavbar
  const hamburger = document.getElementById('navbar-hamburger');
  const navMenu = document.querySelector('.navbar-row nav');
  if (hamburger && navMenu) {
    setupNavbar(hamburger, navMenu);
  }
  document.querySelectorAll('.tour-btn, .destino-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = btn.closest('.tour-card, .destino-card');
      let nombre = '';
      let tipo = '';
      if (card) {
        const nombreElem = card.querySelector('.tour-nombre, .destino-nombre');
        if (nombreElem) {
          nombre = nombreElem.textContent.trim();
        }
        tipo = card.classList.contains('tour-card') ? 'tour' : 'destino';
      }
      if (nombre) {
        const param = tipo === 'tour' ? 'tour' : 'destino';
        window.location.href = `pages/reservas.html?tipo=${encodeURIComponent(tipo)}&${param}=${encodeURIComponent(nombre)}`;
      } else {
        window.location.href = 'pages/reservas.html';
      }
    });
  });
});
// Modal informativo para cards de inicio
function mostrarInfoHomeModal(nombre, desc, imgSrc, precio, info) {
  // Eliminar modal anterior si existe
  const oldModal = document.querySelector('.info-home-modal');
  if (oldModal) oldModal.remove();

  // Crear modal y fondo igual que en destinos.js
  const modal = document.createElement('div');
  modal.className = 'info-home-modal';
  modal.innerHTML = `
    <div class="info-home-content">
      <span class="cerrar-info-x" style="position:absolute;top:12px;right:18px;font-size:2rem;cursor:pointer;color:#fff;z-index:2;">&times;</span>
      <h2>${nombre}</h2>
      <p>${desc}</p>
      ${info ? `<div class='info-extra'>${info}</div>` : ''}
      ${precio ? `<div class="info-precio"><strong>Precio:</strong> <span>${precio}</span></div>` : ''}
      ${window.duracionModalInfo ? `<div class='info-duracion'><strong>Duración:</strong> <span>${window.duracionModalInfo}</span></div>` : ''}
      ${window.detallesModalInfo ? `<div class='info-detalles'><strong>Incluye:</strong> <span>${window.detallesModalInfo}</span></div>` : ''}
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.backgroundImage = `url('${imgSrc}')`;
  modal.style.backgroundSize = 'cover';
  modal.style.backgroundPosition = 'center';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.zIndex = '9999';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.background = `rgba(0,0,0,0.7) url('${imgSrc}') center/cover no-repeat`;
  // Centrar contenido y fondo oscuro/transparente
  const content = modal.querySelector('.info-home-content');
  content.style.position = 'relative';
  content.style.background = 'rgba(30,32,36,0.75)';
  content.style.borderRadius = '18px';
  content.style.padding = '32px 32px 24px 32px';
  content.style.maxWidth = '420px';
  content.style.width = '90%';
  content.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
  content.style.color = '#fff';
  content.style.textShadow = '0 2px 8px rgba(0,0,0,0.7), 0 0 1px #222';
  content.style.fontWeight = '600';
  content.querySelectorAll('h2, p, .info-extra, .info-precio, .info-detalles').forEach(el => {
    el.style.color = '#fff';
    el.style.textShadow = '0 2px 8px rgba(0,0,0,0.7), 0 0 1px #222';
    el.style.fontWeight = '600';
  });
  // Cerrar con X
  content.querySelector('.cerrar-info-x').onclick = () => modal.remove();
  // Cerrar al hacer click fuera del contenido
  modal.onclick = function(e) {
    if (e.target === modal) modal.remove();
  };
}
// Página: inicialización de componentes en Home
import { renderToursDynamic } from '../organisms/tours-dynamic.js';
import { setupCarousel } from '../organisms/carousel.js';
import { setupTestimonialSlider } from '../organisms/testimonial-slider.js';
import { ModalBusqueda } from '../organisms/modalBusqueda.js';
import { ModalInfo } from '../organisms/modalInfo.js';
import { CardTour } from '../molecules/cardTour.js';
import { CardDestino } from '../molecules/cardDestino.js';

// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  // Listeners directos para los botones del modal de búsqueda
  const modalBg = document.getElementById('modal-busqueda-bg');
  const modal = document.getElementById('modal-busqueda');
  if (modal) {
    const buscarBtn = modal.querySelector('.navbar-search-btn');
    const cerrarBtn = modal.querySelector('.cerrar-modal-x');
    const input = modal.querySelector('.navbar-search');
    if (buscarBtn) {
      buscarBtn.onclick = (e) => {
        e.preventDefault();
        filtrarHome();
      };
    }
    if (cerrarBtn) {
      cerrarBtn.onclick = () => {
        modalBg.style.display = 'none';
        if (input) input.value = '';
      };
    }
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') filtrarHome();
      });
    }
  }
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');

  const carousel = document.querySelector('.carousel');
  if (carousel) setupCarousel(carousel);

  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) setupTestimonialSlider(testimonialSlider);

  // Redireccionar los botones de Reserva Ahora a reservas.html
  // Botones 'Reserva Ahora' de inicio muestran el modal informativo
  document.querySelectorAll('.inicio-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = btn.closest('.inicio-card');
      let nombre = '';
      let tipo = '';
      if (card) {
        const nombreElem = card.querySelector('h3');
        if (nombreElem) {
          nombre = nombreElem.textContent.trim();
        }
        tipo = card.classList.contains('tour-card') ? 'tour' : 'destino';
      }
      if (nombre) {
        const param = tipo === 'tour' ? 'tour' : 'destino';
        window.location.href = `pages/reservas.html?tipo=${encodeURIComponent(tipo)}&${param}=${encodeURIComponent(nombre)}`;
      } else {
        window.location.href = 'pages/reservas.html';
      }
    });
  });

  // Cargar tours dinámicos manteniendo atomic design
  renderToursDynamic('tours-list-dinamica', '../assets/data/tours.json');

  // Modal informativo para las cards de inicio (destinos y tours)
  document.querySelectorAll('.inicio-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.onclick = function() {
      const nombre = card.querySelector('h3').textContent;
      const desc = card.querySelector('p')?.textContent || '';
      const precio = card.querySelector('.price-highlight')?.textContent || '';
      const imgSrc = card.querySelector('img')?.src || '';
      let info = '';
      switch (nombre.trim()) {
        case 'Salar de Uyuni':
          info = 'Ubicación: Potosí y Oruro. Mejor época: mayo-septiembre. Actividades: tours en 4x4, fotografía, visita a islas de cactus, observación de estrellas.';
          break;
        case 'Valle de la Luna':
          info = 'Ubicación: La Paz. Mejor época: todo el año. Actividades: senderismo, fotografía, tours guiados.';
          break;
        case 'La Paz':
          info = 'Ubicación: Altiplano boliviano. Mejor época: todo el año. Actividades: city tours, teleférico, museos, gastronomía, miradores urbanos.';
          break;
        case 'Lago Titicaca':
          info = 'Ubicación: Lago Titicaca, La Paz. Mejor época: mayo-septiembre. Actividades: paseos en bote, visita a la Isla del Sol, festividades religiosas.';
          break;
        case 'Cristo de la Concordia':
          info = 'Ubicación: Cochabamba. Mejor época: todo el año. Actividades: mirador panorámico, city tour, fotografía.';
          break;
        case 'Salar de Uyuni Tour':
          info = 'Tour completo por el Salar de Uyuni, incluye transporte, guía, alimentación y hospedaje.';
          break;
        default:
          info = 'Consulta por más información.';
      }
      mostrarInfoHomeModal(nombre, desc, imgSrc, precio, info);
    };
  });
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
  const inputActual = modal.querySelector('.navbar-search');
  if (!inputActual) return;
  const valor = normalizar(inputActual.value || '');
    Promise.all([
      fetch('assets/data/tours.json').then(res => res.json()),
      fetch('assets/data/destinos.json').then(res => res.json())
    ]).then(([tours, destinos]) => {
      const encontradosTours = valor
        ? tours.filter(tour => {
            const nombre = normalizar(tour.nombre);
            const descripcion = normalizar(tour.descripcion);
            return nombre.includes(valor) || descripcion.includes(valor);
          })
        : [];
      const encontradosDestinos = valor
        ? destinos.filter(destino => {
            const nombre = normalizar(destino.nombre);
            const descripcion = normalizar(destino.descripcion);
            return nombre.includes(valor) || descripcion.includes(valor);
          })
        : [];
      // Mostrar resultados en el div #resultados-busqueda usando Atomic Design
      const resultadosDiv = document.getElementById('resultados-busqueda');
      if (resultadosDiv) {
        resultadosDiv.innerHTML = '';
        if (!valor) {
          resultadosDiv.innerHTML = '';
          return;
        }
        // Tours
        if (encontradosTours.length > 0) {
          const h3 = document.createElement('h3');
          h3.textContent = 'Resultados de tours:';
          resultadosDiv.appendChild(h3);
          const grid = document.createElement('div');
          grid.className = 'resultados-grid';
          encontradosTours.forEach(tour => grid.appendChild(CardTour(tour)));
          resultadosDiv.appendChild(grid);
        }
        // Destinos
        if (encontradosDestinos.length > 0) {
          const h3 = document.createElement('h3');
          h3.textContent = 'Resultados de destinos:';
          resultadosDiv.appendChild(h3);
          const grid = document.createElement('div');
          grid.className = 'resultados-grid';
          encontradosDestinos.forEach(destino => grid.appendChild(CardDestino(destino)));
          resultadosDiv.appendChild(grid);
        }
        if (encontradosTours.length === 0 && encontradosDestinos.length === 0) {
          const p = document.createElement('p');
          p.textContent = 'No se encontraron resultados.';
          p.style.textAlign = 'center';
          p.style.color = '#4a6073';
          p.style.fontSize = '1.15rem';
          p.style.marginTop = '32px';
          resultadosDiv.appendChild(p);
        }
      }
      modal.querySelectorAll('.tour-card img, .destino-card img').forEach(img => {
        img.style.cursor = 'pointer';
        img.onclick = function() {
          const card = img.closest('.tour-card, .destino-card');
          const nombre = card.querySelector('h3').textContent;
          const desc = card.querySelector('p')?.textContent || '';
          const precio = card.querySelector('.tour-price, .destino-price')?.textContent || '';
          let info = '';
          switch (nombre.trim()) {
            case 'Salar de Uyuni':
              info = 'Ubicación: Potosí y Oruro. Mejor época: mayo-septiembre. Actividades: tours en 4x4, fotografía, visita a islas de cactus, observación de estrellas.';
              break;
            case 'Valle de la Luna':
              info = 'Ubicación: La Paz. Mejor época: todo el año. Actividades: senderismo, fotografía, tours guiados.';
              break;
            case 'La Paz':
              info = 'Ubicación: Altiplano boliviano. Mejor época: todo el año. Actividades: city tours, teleférico, museos, gastronomía, miradores urbanos.';
              break;
            case 'Lago Titicaca':
              info = 'Ubicación: Lago Titicaca, La Paz. Mejor época: mayo-septiembre. Actividades: paseos en bote, visita a la Isla del Sol, festividades religiosas.';
              break;
            case 'Cristo de la Concordia':
              info = 'Ubicación: Cochabamba. Mejor época: todo el año. Actividades: mirador panorámico, city tour, fotografía.';
              break;
            case 'Salar de Uyuni Tour':
              info = 'Tour completo por el Salar de Uyuni, incluye transporte, guía, alimentación y hospedaje.';
              break;
            default:
              info = 'Consulta por más información.';
          }
          mostrarInfoHomeModal(nombre, desc, img.src, precio, info);
        };
      });
function mostrarInfoHomeModal(nombre, desc, imgSrc, precio, info) {
  const modal = ModalInfo({ nombre, desc, imgSrc, precio, info });
  // El organismo ya agrega el modal al body y el botón de cerrar
}
      if (cerrarBtn) {
        cerrarBtn.onclick = () => {
          modalBg.style.display = 'none';
          nuevoInput.value = '';
        };
      }
      if (nuevoBtn) {
        nuevoBtn.onclick = (e) => {
          e.preventDefault();
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
  navbarBtn.onclick = function(e) {
    e.preventDefault();
    filtrarHome();
  };
  // Buscar al presionar Enter en el input
  navbarInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      filtrarHome();
    }
  });
}
