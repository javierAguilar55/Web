// Buscador navbar (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar el formulario correcto según el parámetro 'tipo'
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
  const formDestino = document.getElementById('form-destino');
  const formTour = document.getElementById('form-tour');
  if (tipo === 'destino') {
    if (formDestino) formDestino.style.display = 'block';
    if (formTour) formTour.style.display = 'none';
  } else {
    if (formTour) formTour.style.display = 'block';
    if (formDestino) formDestino.style.display = 'none';
  }
  // --- Menú personalizado de selección de destino/tour ---
  const customSelectTour = document.getElementById('customSelectTour');
  const customSelectDestino = document.getElementById('customSelectDestino');
  // Función para poblar el menú desde los JSON
  async function poblarOpciones() {
    try {
      const [destinosRes, toursRes] = await Promise.all([
        fetch('../assets/data/destinos.json'),
        fetch('../assets/data/tours.json')
      ]);
      const destinos = await destinosRes.json();
      const tours = await toursRes.json();
      // Extraer nombres de los JSONs cargados
      const destinosArr = destinos.map(d => d.nombre);
      const toursArr = tours.map(t => t.nombre);
    // Función para crear menú personalizado en cada formulario
    function crearMenuCustom(id, opciones, param) {
      const customSelect = document.getElementById(id);
      if (!customSelect) return;
      customSelect.innerHTML = `
        <input type=\"text\" class=\"input-custom\" required placeholder=\"Escribe o selecciona\" autocomplete=\"off\" />
        <div class=\"custom-select-items\" style=\"display:none;\"></div>
      `;
      const inputCustom = customSelect.querySelector('.input-custom');
      const itemsDiv = customSelect.querySelector('.custom-select-items');
      // Autocompletar si viene por parámetro
      if (param) {
        inputCustom.value = decodeURIComponent(param);
        // Opcional: mostrar sugerencias filtradas al cargar si el valor existe
        setTimeout(() => {
          itemsDiv.style.display = 'none';
        }, 200);
      }
      function mostrarSugerencias() {
        const valor = inputCustom.value.trim().toLowerCase();
        const filtradas = valor
          ? opciones.filter(op => op.toLowerCase().includes(valor))
          : opciones;
        if (filtradas.length === 0 || valor === '') {
          itemsDiv.style.display = 'none';
          itemsDiv.innerHTML = '';
          return;
        }
        itemsDiv.innerHTML = filtradas.map(op => `<div class=\"custom-select-item\">${op}</div>`).join('');
        itemsDiv.style.display = 'block';
        itemsDiv.querySelectorAll('.custom-select-item').forEach(item => {
          item.addEventListener('mousedown', () => {
            inputCustom.value = item.textContent;
            itemsDiv.style.display = 'none';
          });
        });
      }
      inputCustom.addEventListener('input', mostrarSugerencias);
      inputCustom.addEventListener('focus', mostrarSugerencias);
      inputCustom.addEventListener('blur', () => {
        setTimeout(() => itemsDiv.style.display = 'none', 120);
      });
    }
    // Detectar parámetro para autocompletar
      let tourParam = urlParams.get('tour');
      let destinoParam = urlParams.get('destino');
    // Crear menú en cada formulario
      crearMenuCustom('customSelectDestino', destinosArr, destinoParam);
      crearMenuCustom('customSelectTour', toursArr, tourParam);
    } catch (err) {
      console.error('Error al poblar opciones de reserva:', err);
    }
  }
  if (customSelectTour || customSelectDestino) poblarOpciones();
  // Autocompletar el campo de destino/tour si viene por parámetro
  const params = new URLSearchParams(window.location.search);
  let tourParam = params.get('tour');
  let destinoParam = params.get('destino');
  const inputTour = document.getElementById('tour');
  if (inputTour) {
    // Si viene de home, puede ser destino o tour destacado
    if (tourParam) {
      inputTour.value = decodeURIComponent(tourParam);
    } else if (destinoParam) {
      inputTour.value = decodeURIComponent(destinoParam);
    } else {
      inputTour.value = '';
    }
  }
  const navbarInput = document.querySelector('.navbar-search');
  const navbarBtn = document.querySelector('.navbar-search-btn');
  if (navbarInput && navbarBtn) {
    function filtrarReservas() {
      const valor = (navbarInput.value || '').toLowerCase().trim();
      document.querySelectorAll('.reserva-card, .reserva-info').forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(valor) ? '' : 'none';
      });
    }
    navbarBtn.onclick = filtrarReservas;
    navbarInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') filtrarReservas();
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Mensaje de reserva enviada
  const form = document.querySelector('.reservas-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      mostrarMensajeReserva();
      form.reset();
    });
  }
  function mostrarMensajeReserva() {
    let mensaje = document.createElement('div');
    mensaje.className = 'reserva-mensaje-exito';
    mensaje.textContent = '¡Reserva enviada exitosamente! Nos contactaremos contigo pronto.';
    form.parentElement.appendChild(mensaje);
    setTimeout(() => {
      mensaje.remove();
    }, 3500);
  }
});
