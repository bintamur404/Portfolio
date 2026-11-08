(function () {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  /* ── 1. Reading Progress Bar ── */
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  document.body.prepend(progress);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
    progress.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── 2. Mobile Navigation Menu ── */
  const menu = $('#menu-toggle');
  const nav = $('#primary-nav');
  const svgMenu = menu?.innerHTML;
  const svgClose = '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19"/></svg>';

  function setMenu(open) {
    if (!menu || !nav) return;
    nav.classList.toggle('nav--open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.innerHTML = open ? svgClose : svgMenu;
  }
  menu?.addEventListener('click', () => setMenu(!nav.classList.contains('nav--open')));
  $$('#primary-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (innerWidth > 760) setMenu(false); });

  /* ── 3. Header Scroll Shadow ── */
  const header = $('.site-header');
  const onScroll = () => header?.classList.toggle('site-header--scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 4. Dark / Light Mode Toggle ── */
  const themeToggle = $('#theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  }

  const moonSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const sunSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';

  function updateToggleIcon() {
    if (!themeToggle) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? sunSVG : moonSVG;
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  updateToggleIcon();

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon();
  });

  /* ── 5. Scroll Reveal with IntersectionObserver ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-left, .stagger').forEach(el => revealObserver.observe(el));

  /* ── 6. Animated Stat Numbers ── */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const duration = 1400;
      const start = performance.now();
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      function step(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const val = Math.round(eased * target);
        el.textContent = prefix + val.toLocaleString() + suffix;
        if (elapsed < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toLocaleString() + suffix;
        }
      }
      requestAnimationFrame(step);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  $$('.stat-number[data-count]').forEach(el => statObserver.observe(el));

  /* ── 7. Publications Filter ── */
  let paperCategory = 'All work';
  let expanded = false;
  const paperCards = $$('.paper-card');
  const paperButtons = $$('[data-paper-filter]');
  const showPapers = $('#show-papers');
  const hidePapers = $('#hide-papers');
  const paperCount = $('#paper-count');

  function applyPapers() {
    let count = 0;
    paperCards.forEach((card, index) => {
      const matches = paperCategory === 'All work' || card.dataset.paperCategory === paperCategory;
      if (matches) count++;
      card.hidden = !matches || (paperCategory === 'All work' && !expanded && index >= 5);
      card.classList.toggle('paper-card--featured', paperCategory === 'All work' && index === 0);
    });
    paperButtons.forEach(b => {
      const active = b.dataset.paperFilter === paperCategory;
      b.classList.toggle('filter-button--active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    if (paperCount) paperCount.textContent = String(count).padStart(2, '0') + ' ITEMS';
    if (showPapers) showPapers.hidden = paperCategory !== 'All work' || expanded;
    if (hidePapers) hidePapers.hidden = paperCategory !== 'All work' || !expanded;
  }

  paperButtons.forEach(b => b.addEventListener('click', () => {
    paperCategory = b.dataset.paperFilter;
    expanded = false;
    applyPapers();
  }));
  showPapers?.addEventListener('click', () => { expanded = true; applyPapers(); });
  hidePapers?.addEventListener('click', () => {
    expanded = false;
    applyPapers();
    $('#publications')?.scrollIntoView({ behavior: 'smooth' });
  });
  applyPapers();

  /* ── 8. Paper Details Modal (Shows Full Details on Click) ── */
  const paperDialog = $('#paper-modal');
  const paperModalBody = $('#paper-modal-body');
  const paperModalClose = $('#paper-modal-close');
  let lastFocus = null;

  function openPaperModal(paperId) {
    const tpl = document.getElementById('paper-details-' + paperId);
    if (!tpl || !paperDialog || !paperModalBody) return;
    lastFocus = document.activeElement;
    paperModalBody.replaceChildren(tpl.content.cloneNode(true));
    paperDialog.showModal();
    paperModalClose?.focus();
  }

  // Click on paper card opens details
  paperCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked direct external link or close button inside, don't trigger modal
      if (e.target.closest('a') && !e.target.closest('[data-open-paper-modal]')) return;
      const paperId = card.dataset.paperId;
      if (paperId) openPaperModal(paperId);
    });
  });

  $$('[data-open-paper-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPaperModal(btn.dataset.openPaperModal);
    });
  });

  paperModalClose?.addEventListener('click', () => paperDialog?.close());
  paperModalBody?.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-paper-modal]')) paperDialog?.close();
    if (e.target.closest('[data-open-cv]')) {
      paperDialog?.close();
      openCVModal();
    }
  });
  paperDialog?.addEventListener('click', (e) => {
    if (e.target === paperDialog) paperDialog.close();
  });
  paperDialog?.addEventListener('close', () => lastFocus?.focus());

  /* ── 9. Project Filtering ── */
  const projectButtons = $$('[data-project-filter]');
  const projectCards = $$('.project-card');

  function applyProjects(category) {
    let visibleIndex = 0;
    projectCards.forEach(card => {
      const visible = category === 'All projects' || card.dataset.projectCategory === category;
      card.hidden = !visible;
      card.classList.toggle('project-card--main', category === 'All projects' && visibleIndex === 0 && visible);
      if (visible) visibleIndex++;
    });
    projectButtons.forEach(btn => {
      const active = btn.dataset.projectFilter === category;
      btn.classList.toggle('project-filter--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
  projectButtons.forEach(b => b.addEventListener('click', () => applyProjects(b.dataset.projectFilter)));

  /* ── 10. Project Modal ── */
  const projectDialog = $('#project-modal');
  const projectModalBody = $('#project-modal-body');
  const projectModalClose = $('#project-modal-close');

  $$('[data-project-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tpl = document.getElementById('details-' + btn.dataset.projectId);
      if (!tpl || !projectDialog || !projectModalBody) return;
      lastFocus = document.activeElement;
      projectModalBody.replaceChildren(tpl.content.cloneNode(true));
      projectDialog.showModal();
      projectModalClose?.focus();
    });
  });

  projectModalClose?.addEventListener('click', () => projectDialog?.close());
  projectModalBody?.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-modal]')) projectDialog?.close();
  });
  projectDialog?.addEventListener('click', (e) => {
    if (e.target === projectDialog) projectDialog.close();
  });
  projectDialog?.addEventListener('close', () => lastFocus?.focus());

  /* ── 11. CV Preview Modal ── */
  const cvDialog = $('#cv-modal');
  const cvClose = $('#cv-modal-close');

  function openCVModal() {
    if (!cvDialog) return;
    lastFocus = document.activeElement;
    cvDialog.showModal();
    cvClose?.focus();
  }

  $('#preview-cv-btn')?.addEventListener('click', openCVModal);
  $('#hero-preview-cv-btn')?.addEventListener('click', openCVModal);
  $('#mobile-preview-cv-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    setMenu(false);
    openCVModal();
  });
  $$('[data-open-cv]').forEach(btn => btn.addEventListener('click', openCVModal));

  cvClose?.addEventListener('click', () => cvDialog?.close());
  cvDialog?.addEventListener('click', (e) => {
    if (e.target === cvDialog) cvDialog.close();
  });
  cvDialog?.addEventListener('close', () => lastFocus?.focus());

  /* ── 12. Copy Email with Feedback ── */
  const copyBtn = $('#copy-email');
  let resetTimer;
  copyBtn?.addEventListener('click', async () => {
    const text = 'abdullahibnetayebtamur@gmail.com';
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.innerHTML = '<span aria-hidden="true">✓</span> <span>Email copied</span>';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyBtn.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="5" width="14" height="17" rx="2"/><path d="M9 5V3h8v2M10 10h6M10 14h6"/></svg> <span>Copy email</span>';
      }, 2300);
    } catch {
      window.location.href = 'mailto:' + text;
    }
  });

  /* ── 13. Active Nav Link Tracking ── */
  const trackedSections = $$('section[id], footer[id]');
  const navLinks = $$('#primary-nav a[href^="#"]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('nav-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  trackedSections.forEach(s => navObserver.observe(s));
})();
