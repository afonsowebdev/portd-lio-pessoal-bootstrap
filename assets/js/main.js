// main.js
import { initProjectModal } from "./modal.js";
import { initValidation } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {
  initProjectModal();
  initValidation();
  initDarkMode();
});

// Função para inicializar o modo dark
function initDarkMode() {
  const darkModeBtn = document.querySelector('.btn-dark-mode');
  const body = document.body;
  const icon = darkModeBtn.querySelector('i');

  // Verificar se o modo dark está salvo no localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (isDarkMode) {
    body.classList.add('dark-mode');
    icon.classList.remove('bx-moon');
    icon.classList.add('bx-sun');
  }

  // Event listener para o botão
  darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');

    // Salvar no localStorage
    localStorage.setItem('darkMode', isDark);

    // Alterar ícone
    if (isDark) {
      icon.classList.remove('bx-moon');
      icon.classList.add('bx-sun');
    } else {
      icon.classList.remove('bx-sun');
      icon.classList.add('bx-moon');
    }
  });
}
