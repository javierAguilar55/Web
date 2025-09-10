// Molécula: tarjeta de tour con efecto hover
export function setupTourCard(card) {
  card.addEventListener('mouseenter', () => card.classList.add('hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
}
