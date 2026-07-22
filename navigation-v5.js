(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.topbar, .notes-nav, .case-nav');
  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 28);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const localNav = document.querySelector('.notes-nav nav, .case-nav nav');
  if (localNav && 'IntersectionObserver' in window) {
    const links = [...localNav.querySelectorAll('a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const setCurrent = (id) => links.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .08, .2] });
    sections.forEach((section) => observer.observe(section));
    if (sections[0]) setCurrent(sections[0].id);
  }

  if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const targets = document.querySelectorAll('.nav-links a, .language-toggle button, .contact-pill, .notes-nav nav a, .notes-actions button, .notes-actions a, .case-nav nav a, .case-actions button, .back-link');
  targets.forEach((target) => {
    target.addEventListener('pointermove', (event) => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--nav-x', `${((event.clientX - rect.left) / rect.width - .5) * 5}px`);
      target.style.setProperty('--nav-y', `${((event.clientY - rect.top) / rect.height - .5) * 4}px`);
    });
    target.addEventListener('pointerleave', () => {
      target.style.removeProperty('--nav-x');
      target.style.removeProperty('--nav-y');
    });
  });
})();
