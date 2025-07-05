// Theme toggle logic
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  // Initialize theme from localStorage or default
  const storedTheme = localStorage.getItem('ds-portfolio-theme');
  if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
    updateToggleIcon(storedTheme);
  }

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ds-portfolio-theme', next);
    updateToggleIcon(next);
  });

  function updateToggleIcon(theme) {
    toggleBtn.querySelector('.icon').textContent = theme === 'light' ? '🌙' : '☀️';
  }
})();