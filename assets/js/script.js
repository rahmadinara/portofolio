(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;

  // Theme
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const icon = themeToggle.querySelector('[data-theme-icon]');
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
    }
  };

  applyTheme(initialTheme);

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  });

  // Mobile navigation
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    if (!navLinks) return;
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open', !isOpen);
    body.classList.toggle('menu-open', !isOpen);
  });

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  // Active navigation for homepage sections
  const sectionLinks = [...document.querySelectorAll('[data-nav-links] a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });
    sections.forEach((section) => activeObserver.observe(section));
  }

  // Generic filtering for projects and labs
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const targetSelector = group.dataset.filterTarget;
    if (!targetSelector) return;
    const items = [...document.querySelectorAll(targetSelector)];
    const emptyState = document.querySelector(group.dataset.emptyTarget || '');

    group.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.filter || 'all';
        group.querySelectorAll('[data-filter]').forEach((btn) => {
          const active = btn === button;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-pressed', String(active));
        });

        let visibleCount = 0;
        items.forEach((item) => {
          const categories = (item.dataset.category || '').split(/\s+/).filter(Boolean);
          const show = value === 'all' || categories.includes(value);
          item.hidden = !show;
          if (show) visibleCount += 1;
        });

        if (emptyState) emptyState.hidden = visibleCount > 0;
      });
    });
  });

  // Certificate modal / image lightbox. Buttons are only rendered when a verified local image exists.
  const modal = document.querySelector('[data-certificate-modal]');
  const modalImage = modal?.querySelector('[data-modal-image]');
  const modalTitle = modal?.querySelector('[data-modal-title]');
  const modalClose = modal?.querySelector('[data-modal-close]');
  let modalTrigger = null;

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('menu-open');
    modalTrigger?.focus();
    modalTrigger = null;
  };

  document.querySelectorAll('[data-certificate-image]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!modal || !modalImage) return;
      const src = button.dataset.certificateImage;
      if (!src) return;
      modalTrigger = button;
      modalImage.src = src;
      modalImage.alt = button.dataset.certificateAlt || 'Certificate image';
      if (modalTitle) modalTitle.textContent = button.dataset.certificateTitle || 'Certificate';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      body.classList.add('menu-open');
      modalClose?.focus();
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  // Scroll reveal
  const revealItems = [...document.querySelectorAll('.reveal')];
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Current year
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
