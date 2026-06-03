const STORAGE_KEY = "theme";
const DARK = "dark";
const LIGHT = "light";

function preferred() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === DARK || stored === LIGHT) return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
}

function apply(theme) {
  const isDark = theme === DARK;
  document.body.classList.toggle("dark-mode", isDark);
  document.documentElement.setAttribute("data-theme", theme);

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute("aria-pressed", String(isDark));
    const labelKey = isDark ? "nav.theme.light" : "nav.theme.dark";
    btn.setAttribute("aria-label", labelKey);
  });
}

export function initTheme() {
  apply(preferred());

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("dark-mode") ? LIGHT : DARK;
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
    });
  });

  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) apply(e.matches ? DARK : LIGHT);
  });
}
