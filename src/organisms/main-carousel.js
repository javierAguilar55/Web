// Carrusel automático para la página principal
let current = 0;
const images = document.querySelectorAll('.carousel-img');
const total = images.length;

function showImage(idx) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
}

setInterval(() => {
  current = (current + 1) % total;
  showImage(current);
}, 3500);

// Mostrar la primera imagen al cargar
showImage(current);
