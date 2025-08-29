// Organismo: carrusel simple
export function setupCarousel(carousel, interval = 4000) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, interval);
}
