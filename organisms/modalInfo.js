// Modal informativo para TOURS con fondo y card centrada, versión única y completa
export function ModalInfoTour({ nombre, desc, imgSrc, precio, info, duracion, dificultad }) {
  const modal = document.createElement('div');
  modal.className = 'info-tour-modal';
  modal.innerHTML = `
    <div class="info-tour-content">
      <span class="cerrar-info-x" style="position:absolute;top:12px;right:18px;font-size:2rem;cursor:pointer;color:#fff;z-index:2;">&times;</span>
      <h2>${nombre}</h2>
      <p>${desc}</p>
      <div class="info-tour-meta">
        ${duracion ? `<span><b>Duración:</b> ${duracion}</span>` : ''}
        ${dificultad ? `<span style='margin-left:12px;'><b>Dificultad:</b> ${dificultad}</span>` : ''}
      </div>
      <div class="info-extra">${info || ''}</div>
      <div class="info-precio">${precio ? `<span class='price-highlight'>${precio}</span>` : ''}</div>
      <div class="info-tour-row"><strong>Recomendaciones:</strong> <span>Llevar ropa cómoda, protector solar y agua. Consultar por requisitos especiales.</span></div>
      <div class="info-tour-row"><strong>Contacto:</strong> <span>info@tourstours.com | WhatsApp: +591 70000000</span></div>
    </div>
  `;
  // Fondo con imagen y overlay oscuro
  Object.assign(modal.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `rgba(0,0,0,0.7) url('${imgSrc}') center/cover no-repeat`,
    backdropFilter: 'blur(2px)'
  });
  // Card centrada
  const content = modal.querySelector('.info-tour-content');
  Object.assign(content.style, {
    position: 'relative',
    background: 'rgba(30,32,36,0.80)',
    borderRadius: '18px',
    padding: '32px 32px 24px 32px',
    maxWidth: '420px',
    width: '90%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    color: '#fff',
    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 1px #222',
    fontWeight: '600',
    zIndex: 2
  });
  content.querySelectorAll('h2, p, .info-extra, .info-precio, .info-tour-meta, .info-tour-row').forEach(el => {
    el.style.color = '#fff';
    el.style.textShadow = '0 2px 8px rgba(0,0,0,0.7), 0 0 1px #222';
    el.style.fontWeight = '600';
  });
  modal.querySelector('.cerrar-info-x').onclick = () => modal.remove();
  modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
  document.body.appendChild(modal);
  return modal;
}
// Organism: Modal informativo

// Modal original para destinos (sin cambios)
export function ModalInfo({ nombre, desc, imgSrc, precio, info }) {
  const modal = document.createElement('div');
  modal.className = 'info-destino-modal';
  modal.innerHTML = `
    <div class="info-destino-content">
      <span class="cerrar-info-x" style="position:absolute;top:12px;right:18px;font-size:2rem;cursor:pointer;color:#fff;z-index:2;">&times;</span>
      <h2>${nombre}</h2>
      <p>${desc}</p>
      <div class="info-extra">${info}</div>
      <img src="${imgSrc}" alt="${nombre}" style="max-width:320px;margin:16px auto;display:block;border-radius:12px;box-shadow:0 2px 12px #0002;" />
      <div class="info-precio">${precio ? `<span class='price-highlight'>${precio}</span>` : ''}</div>
    </div>
  `;
  Object.assign(modal.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  });
  modal.querySelector('.cerrar-info-x').onclick = () => {
    modal.remove();
  };
  document.body.appendChild(modal);
  return modal;
}

// Modal para tours: fondo con imagen, card centrada con info
