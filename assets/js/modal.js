// modal.js
export function initProjectModal() {
  const buttons = document.querySelectorAll(".open-modal");

  // Segurança: se não existir modal ou botões, não quebra
  if (!buttons.length) return;

  const modalElement = document.getElementById("projectModal");
  if (!modalElement) return;

  const modal = new bootstrap.Modal(modalElement);

  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalLink = document.getElementById("modalLink");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Dados vindos do botão
      const title = button.dataset.title;
      const description = button.dataset.description;
      const tech = button.dataset.tech.split(",");
      const link = button.dataset.link;

      // Preenche o modal
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalLink.href = link;

      // Limpa tecnologias anteriores
      modalTech.innerHTML = "";

      tech.forEach((item) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-secondary me-2 mb-2";
        badge.textContent = item.trim();
        modalTech.appendChild(badge);
      });

      modal.show();
    });
  });
}
