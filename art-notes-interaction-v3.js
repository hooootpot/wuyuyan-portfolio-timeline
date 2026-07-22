(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.notes-section').forEach((section) => section.classList.add('reveal-ready'));
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.notes-section').forEach((section) => observer.observe(section));
  } else document.querySelectorAll('.notes-section').forEach((section) => section.classList.add('is-visible'));
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reduced) return;
  const board = document.querySelector('.construct-board');
  if (!board) return;
  board.addEventListener('pointermove', (event) => {
    const rect = board.getBoundingClientRect();
    board.style.setProperty('--ry', `${(((event.clientX - rect.left) / rect.width) - .5) * 5}deg`);
    board.style.setProperty('--rx', `${-(((event.clientY - rect.top) / rect.height) - .5) * 5}deg`);
  });
  board.addEventListener('pointerleave', () => { board.style.removeProperty('--rx'); board.style.removeProperty('--ry'); });
})();
