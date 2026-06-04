import { translations } from "./translations.js";

const STORAGE_KEY = "lang";
const SUPPORTED = ["pt", "en", "fr"];
const FALLBACK = "pt";

const LANG_META = {
  pt: { label: "Português", short: "PT", flag: "PT" },
  en: { label: "English",   short: "EN", flag: "EN" },
  fr: { label: "Français",  short: "FR", flag: "FR" }
};
 
let current = FALLBACK;

function detectInitialLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : FALLBACK;
}

function translate(key) {
  return translations[current]?.[key] ?? translations[FALLBACK]?.[key] ?? key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = translate(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = translate(el.getAttribute("data-i18n-html"));
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const spec = el.getAttribute("data-i18n-attr");
    spec.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s && s.trim());
      if (attr && key) el.setAttribute(attr, translate(key));
    });
  });

  const titleKey = document.querySelector("title")?.getAttribute("data-i18n");
  if (titleKey) document.title = translate(titleKey);

  const metaDesc = document.querySelector('meta[name="description"]');
  const descKey = metaDesc?.getAttribute("data-i18n");
  if (descKey) metaDesc.setAttribute("content", translate(descKey));

  document.documentElement.lang = current === "pt" ? "pt-PT" : current;

  document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang: current } }));
}

function buildSwitcher() {
  const root = document.querySelector("[data-lang-switcher]");
  if (!root) return;

  const button = root.querySelector(".lang-toggle");
  const menu = root.querySelector(".lang-menu");
  if (!button || !menu) return;

  menu.innerHTML = SUPPORTED.map((code) => `
    <button type="button" class="lang-option" data-lang="${code}" ${code === current ? 'aria-current="true"' : ""}>
      <span class="lang-flag">${LANG_META[code].flag}</span>
      <span>${LANG_META[code].label}</span>
    </button>
  `).join("");

  const updateLabel = () => {
    const labelEl = button.querySelector(".lang-current");
    if (labelEl) labelEl.textContent = LANG_META[current].short;
  };

  updateLabel();

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = root.getAttribute("data-open") === "true";
    root.setAttribute("data-open", open ? "false" : "true");
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) root.setAttribute("data-open", "false");
  });

  menu.querySelectorAll("[data-lang]").forEach((opt) => {
    opt.addEventListener("click", () => {
      const next = opt.getAttribute("data-lang");
      if (!SUPPORTED.includes(next)) return;
      setLanguage(next);
      root.setAttribute("data-open", "false");
      menu.querySelectorAll(".lang-option").forEach((b) => b.removeAttribute("aria-current"));
      opt.setAttribute("aria-current", "true");
      updateLabel();
    });
  });
}

export function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return;
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations();
}

export function getCurrentLang() { return current; }

export function getTranslation(key) { return translate(key); }

export function initI18n() {
  current = detectInitialLang();
  applyTranslations();
  buildSwitcher();
}
