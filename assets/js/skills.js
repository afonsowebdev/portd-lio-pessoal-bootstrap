// Habilidades: filtro por categoria (Todas / Front-End / Back-End) com
// entrada escalonada das cartões e reveal quando a grelha entra no ecrã.
export function initSkillsTabs() {
  const filters = document.querySelectorAll(".skills-filter");
  const grid = document.querySelector(".skills-grid");
  const cards = Array.from(document.querySelectorAll(".skill-card"));
  if (!grid || !cards.length) return;

  let revealed = false;

  // Mostra/esconde os cartões da categoria e renumera o índice de stagger
  // apenas com os visíveis, para a animação ficar sempre contínua.
  function layout(category) {
    let index = 0;
    cards.forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !match);
      if (match) card.style.setProperty("--stagger", index++);
    });
  }

  // (Re)dispara a animação de entrada nos cartões visíveis.
  function animate() {
    cards.forEach((card) => {
      if (card.classList.contains("is-hidden")) return;
      card.classList.remove("animate-in");
      void card.offsetWidth; // força reflow para reiniciar a animação
      card.classList.add("animate-in");
    });
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      layout(btn.dataset.filter);
      if (revealed) animate();
    });
  });

  layout("all");

  // Anima na primeira vez que a grelha aparece no ecrã.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealed = true;
          animate();
          obs.disconnect();
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(grid);
  } else {
    revealed = true;
    animate();
  }
}
