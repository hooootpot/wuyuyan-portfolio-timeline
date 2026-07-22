(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bindTilt = (element, strength, xName, yName, degrees = true) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * strength;
      const y = ((event.clientY - rect.top) / rect.height - .5) * strength;
      element.style.setProperty(xName, `${degrees ? -y : x}${degrees ? 'deg' : 'px'}`);
      element.style.setProperty(yName, `${degrees ? x : y}${degrees ? 'deg' : 'px'}`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.removeProperty(xName);
      element.style.removeProperty(yName);
    });
  };
  document.querySelectorAll('.project-timeline-item').forEach((item) => bindTilt(item, 3.2, '--tilt-x', '--tilt-y'));
  document.querySelectorAll('.strength-card').forEach((card) => bindTilt(card, 9, '--float-x', '--float-y', false));
})();
