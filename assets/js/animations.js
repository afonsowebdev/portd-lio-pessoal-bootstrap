import { getTranslation } from "./i18n.js";

const ROLE_KEYS = ["hero.roles.0", "hero.roles.1", "hero.roles.2", "hero.roles.3"];

export function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  items.forEach((el) => io.observe(el));
}

export function initRotatingRole() {
  const el = document.querySelector("[data-rotating-role]");
  if (!el) return;

  let roles = ROLE_KEYS.map(getTranslation);
  let i = 0, char = 0, deleting = false, raf = 0;

  const tick = () => {
    const target = roles[i];
    if (!deleting) {
      char++;
      el.textContent = target.slice(0, char);
      if (char === target.length) {
        deleting = true;
        raf = window.setTimeout(tick, 1500);
        return;
      }
      raf = window.setTimeout(tick, 70);
    } else {
      char--;
      el.textContent = target.slice(0, char);
      if (char === 0) {
        deleting = false;
        i = (i + 1) % roles.length;
        raf = window.setTimeout(tick, 250);
        return;
      }
      raf = window.setTimeout(tick, 40);
    }
  };

  tick();

  document.addEventListener("i18n:change", () => {
    roles = ROLE_KEYS.map(getTranslation);
    char = 0; deleting = false;
    window.clearTimeout(raf);
    tick();
  });
}

export function initStatsCounter() {
  const items = document.querySelectorAll("[data-counter]");
  if (!items.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute("data-counter")) || 0;
      const suffix = el.getAttribute("data-counter-suffix") || "";
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = `${val}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });

  items.forEach((el) => io.observe(el));
}

export function initProjectFilter() {
  const filterRoot = document.querySelector(".projects-filter");
  if (!filterRoot) return;

  const chips = filterRoot.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".project-card[data-category]");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter");
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      cards.forEach((card) => {
        const match = filter === "all" || card.getAttribute("data-category") === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}
