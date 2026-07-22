(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.case-section').forEach((section) => section.classList.add('reveal-ready'));
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.case-section').forEach((section) => observer.observe(section));
  } else document.querySelectorAll('.case-section').forEach((section) => section.classList.add('is-visible'));
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reduced) return;
  const tilt = (element, strength = 5) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--ry', `${(((event.clientX - rect.left) / rect.width) - .5) * strength}deg`);
      element.style.setProperty('--rx', `${-(((event.clientY - rect.top) / rect.height) - .5) * strength}deg`);
    });
    element.addEventListener('pointerleave', () => { element.style.removeProperty('--rx'); element.style.removeProperty('--ry'); });
  };
  const hero = document.querySelector('.hero-art');
  if (hero) tilt(hero, 5.5);
})();
