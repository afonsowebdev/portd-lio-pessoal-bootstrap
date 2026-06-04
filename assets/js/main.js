import { initI18n, setLanguage, getCurrentLang } from "./i18n.js";
import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initReveal, initRotatingRole, initStatsCounter, initProjectFilter } from "./animations.js";
import { initProjectModal } from "./modal.js";
import { initValidation } from "./validation.js";
import { initFadeInAnimations } from "./fade-in.js";
import { initSkillsTabs } from "./skills.js";

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

  // Ciclo entre os idiomas preparados: Português → Inglês → Francês → ...
  const order = ["pt", "en", "fr"];
  const shortLabel = { pt: "PT", en: "EN", fr: "FR" };
  const ariaLabel = {
    pt: "Mudar idioma para português",
    en: "Mudar idioma para inglês",
    fr: "Mudar idioma para francês"
  };

  const nextOf = (lang) => order[(order.indexOf(lang) + 1) % order.length];

  // O botão mostra o próximo idioma para o qual vai mudar.
  const updateLabel = () => {
    const next = nextOf(getCurrentLang());
    button.textContent = shortLabel[next];
    button.setAttribute("aria-label", ariaLabel[next]);
  };

  updateLabel();

  button.addEventListener("click", () => {
    setLanguage(nextOf(getCurrentLang()));
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
  initSkillsTabs();
});
