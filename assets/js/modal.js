import { getTranslation } from "./i18n.js";

export function initProjectModal() {
  const buttons = document.querySelectorAll(".open-modal");
  if (!buttons.length) return;

  const modalElement = document.getElementById("projectModal");
  if (!modalElement || !window.bootstrap) return;

  const modal = new window.bootstrap.Modal(modalElement);
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalLink = document.getElementById("modalLink");
 
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const titleKey = button.dataset.titleKey;
      const descKey = button.dataset.descKey;
      const tech = (button.dataset.tech || "").split(",");
      const link = button.dataset.link || "#";

      modalTitle.textContent = titleKey ? getTranslation(titleKey) : (button.dataset.title || "");
      modalDescription.textContent = descKey ? getTranslation(descKey) : (button.dataset.description || "");
      modalLink.href = link;

      modalTech.innerHTML = "";
      tech.forEach((item) => {
        const t = item.trim();
        if (!t) return;
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = t;
        modalTech.appendChild(badge);
      });

      modal.show();
    });
  });
}
