// Organismo: menú responsive
export function setupNavbar(toggleBtn, navMenu) {
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}
