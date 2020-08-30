import { getElement } from './utils.js'; // Ver si seleccionamos correctamente un Element

// Seleccionamos:
const toggleNav = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const closeBtn = getElement('.sidebar-close');

// Evts:
toggleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show');
});
