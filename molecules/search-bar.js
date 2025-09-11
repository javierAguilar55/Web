// Molécula: barra de búsqueda con filtrado
export function setupSearchBar(input, cardsSelector) {
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    document.querySelectorAll(cardsSelector).forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });
}
