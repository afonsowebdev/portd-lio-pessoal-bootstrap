import { initI18n, setLanguage, getCurrentLang } from "./i18n.js";
import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initReveal, initRotatingRole, initStatsCounter, initProjectFilter } from "./animations.js";
import { initProjectModal } from "./modal.js";
import { initValidation } from "./validation.js";
import { initFadeInAnimations } from "./fade-in.js";

function initHeaderScroll() {
  const header = document.querySelector(".site-nav");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
}

function initLangToggle() {
  const button = document.querySelector("[data-lang-toggle]");
  if (!button) return;

  const updateLabel = () => {
    const current = getCurrentLang();
    button.textContent = current === "pt" ? "EN" : "PT";
    button.setAttribute("aria-label", current === "pt" ? "Mudar idioma para inglês" : "Mudar idioma para português");
  };

  updateLabel();

  button.addEventListener("click", () => {
    setLanguage(getCurrentLang() === "pt" ? "en" : "pt");
    updateLabel();
  });

  document.addEventListener("i18n:change", updateLabel);
}

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  initTheme();
  initHeaderScroll();
  initLangToggle();
  initNav();
  initFadeInAnimations();
  initReveal();
  initRotatingRole();
  initStatsCounter();
  initProjectFilter();
  initProjectModal();
  initValidation();
});
