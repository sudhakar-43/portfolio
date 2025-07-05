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

// Modal logic
(function () {
  const openButtons = document.querySelectorAll('.open-modal');
  const modals = document.querySelectorAll('.modal');

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (!modal) return;
      openModal(modal);
    });
  });

  modals.forEach((modal) => {
    const dialog = modal.querySelector('.modal-dialog');
    const closeBtn = modal.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const visibleModal = document.querySelector('.modal.is-visible');
      if (visibleModal) closeModal(visibleModal);
    }
  });

  function openModal(modal) {
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
})();