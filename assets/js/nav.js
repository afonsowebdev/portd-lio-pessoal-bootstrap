export function initNav() {
  const nav = document.querySelector(".site-nav");
  const offcanvasEl = document.getElementById("mobileOffcanvas");
  const offcanvasInstance = offcanvasEl && window.bootstrap ? window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl) : null;
  const mobileLinks = offcanvasEl?.querySelectorAll(".nav-link") ?? [];

  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // fechar offcanvas quando clicar em um link interno
  mobileLinks.forEach((link) => link.addEventListener("click", () => offcanvasInstance?.hide()));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") offcanvasInstance?.hide();
  });

  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (sections.length && "IntersectionObserver" in window) {
    const links = document.querySelectorAll('#mobileOffcanvas .nav-link[href^="#"]');
    const map = new Map();
    links.forEach((l) => {
      const id = l.getAttribute("href").slice(1);
      if (id) map.set(id, l);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((l) => l.classList.remove("is-active"));
        const active = map.get(id);
        active?.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach((s) => io.observe(s));
  }

  const scrollTop = document.querySelector(".floating-scroll-top");
  if (scrollTop) {
    const toggle = () => scrollTop.classList.toggle("is-visible", window.scrollY > 600);
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}
