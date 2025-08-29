// Organismo: slider de testimonios
export function setupTestimonialSlider(slider) {
  const slides = slider.querySelectorAll('.testimonial');
  let idx = 0;
  function showSlide(i) {
    slides.forEach((s, j) => s.classList.toggle('active', i === j));
  }
  slider.querySelector('.next').addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    showSlide(idx);
  });
  slider.querySelector('.prev').addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    showSlide(idx);
  });
  showSlide(idx);
}
