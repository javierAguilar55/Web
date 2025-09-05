// Página: inicialización de componentes en Home
import { renderToursDynamic } from '../organisms/tours-dynamic.js';
import { setupCarousel } from '../organisms/carousel.js';
import { setupTestimonialSlider } from '../organisms/testimonial-slider.js';

// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  if (navbarInput && navbarBtn) {
    function normalizar(str) {
      return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // quita tildes
        .replace(/[^a-z0-9 ]/gi, '') // quita caracteres especiales
        .replace(/\s+/g, ' ') // unifica espacios
        .toLowerCase()
        .trim();
    }
    // Crear contenedor para resultados dinámicos de tours
    // Modal de resultados
    let modalBg = document.getElementById('modal-busqueda-bg');
    if (!modalBg) {
      modalBg = document.createElement('div');
      modalBg.id = 'modal-busqueda-bg';
      modalBg.className = 'modal-busqueda-bg';
      modalBg.style.display = 'none';
      document.body.appendChild(modalBg);
    }
    let modal = document.getElementById('modal-busqueda');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-busqueda';
      modal.className = 'modal-busqueda';
      modalBg.appendChild(modal);
    }
    function filtrarHome() {
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
        if (valor && (encontradosTours.length > 0 || encontradosDestinos.length > 0)) {
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
                    <span class="destino-price">${destino.precio}</span>
                  </div>
                  <button class="destino-btn">Reserva Ahora</button>
                </div>
              </div>
            `).join('') + `</div>`;
          }
        } else {
          html += '<div style="color:#ff6b3d;text-align:center;font-size:1.2rem;padding:32px 0;">No encontramos coincidencias para tu búsqueda.<br>¡Nuestro equipo de Turismo está listo para ayudarte a encontrar la mejor experiencia!<br>Intenta con otro destino o tour, o contáctanos para asesoría personalizada.</div>';
        }
        modal.innerHTML = html;
        modalBg.style.display = 'flex';
        modal.querySelectorAll('.tour-btn, .destino-btn').forEach(btn => {
          btn.onclick = function() {
            window.location.href = 'pages/reservas.html';
          };
        });
        // Cerrar modal
        modal.querySelector('.cerrar-modal').onclick = function() {
          modal.innerHTML = '';
          modalBg.style.display = 'none';
          navbarInput.value = '';
        };
      });
    }
    navbarBtn.onclick = filtrarHome;
  // El modal solo aparece al hacer clic en el botón de buscar
  }

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
