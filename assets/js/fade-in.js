/**
 * Init automatic fade-in animations
 * Aplica animações de entrada aos elementos da página
 */

export function initFadeInAnimations() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section) => {
    // Determina o tipo de animação baseado na seção
    const sectionId = section.id || '';
    
    if (sectionId === 'hero') {
      animateHeroSection(section);
    } else if (sectionId === 'about') {
      animateAboutSection(section);
    } else if (sectionId === 'projects') {
      animateProjectsSection(section);
    } else if (sectionId === 'services') {
      animateServicesSection(section);
    } else if (sectionId === 'skills') {
      animateSkillsSection(section);
    } else if (sectionId === 'contact') {
      animateContactSection(section);
    } else {
      // Para outras seções, aplicar fade-in padrão
      section.classList.add('fade-in');
    }
  });

  // Aplicar animação ao footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.classList.add('fade-in');
  }
}

function animateHeroSection(section) {
  const heroText = section.querySelector('.hero .col:first-child');
  const heroImage = section.querySelector('.hero-image');

  if (heroText) heroText.classList.add('fade-in-left');
  if (heroImage) heroImage.classList.add('fade-in-right');

  const children = section.querySelectorAll('.hero-availability, .hero__title, .hero__description, .hero__buttons, .hero-stats');
  let delay = 200;
  children.forEach((child) => {
    child.style.animation = `fade-in-up 700ms var(--ease-out) ${delay}ms both`;
    delay += 100;
  });
}

function animateAboutSection(section) {
  const aboutText = section.querySelector('.about .col:first-child');
  const aboutImage = section.querySelector('.about-image');

  if (aboutText) aboutText.classList.add('fade-in-left');
  if (aboutImage) aboutImage.classList.add('fade-in-right');

  const children = section.querySelectorAll('.about-tag, .about__title, .about__description, .about__buttons, .about-stats');
  let delay = 100;
  children.forEach((child) => {
    child.style.animation = `fade-in-up 700ms var(--ease-out) ${delay}ms both`;
    delay += 100;
  });
}

function animateProjectsSection(section) {
  const header = section.querySelector('h2, .section-title');
  if (header) header.classList.add('fade-in-up');

  const cards = section.querySelectorAll('.project-card, .card');
  let delay = 200;
  cards.forEach((card) => {
    card.style.animation = `fade-in-scale 700ms var(--ease-out) ${delay}ms both`;
    delay += 100;
  });
}

function animateServicesSection(section) {
  const header = section.querySelector('h2, .section-title');
  if (header) header.classList.add('fade-in-up');

  const cards = section.querySelectorAll('.service-card, .card');
  let delay = 200;
  cards.forEach((card) => {
    card.style.animation = `fade-in-scale 700ms var(--ease-out) ${delay}ms both`;
    delay += 100;
  });
}

function animateSkillsSection(section) {
  const header = section.querySelector('h2, .section-title');
  if (header) header.classList.add('fade-in-up');

  const categories = section.querySelectorAll('.skills-category, [class*="skills"]');
  let delay = 200;
  categories.forEach((cat) => {
    cat.style.animation = `fade-in-scale 700ms var(--ease-out) ${delay}ms both`;
    delay += 100;
  });
}

function animateContactSection(section) {
  const header = section.querySelector('h2, .section-title');
  if (header) header.classList.add('fade-in-up');

  const content = section.querySelectorAll('.contact-card, form, .contact-info');
  let delay = 200;
  content.forEach((item) => {
    item.style.animation = `fade-in-scale 700ms var(--ease-out) ${delay}ms both`;
    delay += 100;
  });
}
