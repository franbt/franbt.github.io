/**
 * ==========================================================================
 * APPLICATION CONTROLLER (main.js)
 * Coordinates HTMX partial lifecycle, Three.js container mounting,
 * live aspect-ratio morphing, theme switching, and TV/Keyboard navigation.
 * ==========================================================================
 */

import {
  initAllThreeContainers,
  cleanupThreeContainersIn,
  refreshThreeThemes,
} from './three-stage.js';

/* --------------------------------------------------------------------------
   1. THEME MANAGEMENT (Dark Architectural / Light Editorial)
   -------------------------------------------------------------------------- */
function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
  }
  updateThemeButtonLabel();

  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('[data-action="toggle-theme"]');
    if (!toggleBtn) return;

    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeButtonLabel();
    refreshThreeThemes();
  });
}

function updateThemeButtonLabel() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const labelEl = document.querySelector('[data-theme-label]');
  if (labelEl) {
    labelEl.textContent = current === 'dark' ? 'DARK // 01' : 'LIGHT // 02';
  }
}

/* --------------------------------------------------------------------------
   2. LIVE ASPECT-RATIO MORPHING CONTROLLER
   Allows switching any target container between horizontal (21:9, 16:9, 4:3),
   square (1:1), and vertical (4:5, 9:16) ratios on the fly.
   -------------------------------------------------------------------------- */
function initAspectSwitcher() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-aspect-switch]');
    if (!btn) return;

    const targetSelector = btn.getAttribute('data-aspect-target') || '#hero-aspect-frame';
    const newAspect = btn.getAttribute('data-aspect-switch');
    const targetFrame = document.querySelector(targetSelector);

    if (targetFrame && newAspect) {
      targetFrame.setAttribute('data-aspect', newAspect);

      const group = btn.closest('.control-group');
      if (group) {
        group.querySelectorAll('[data-aspect-switch]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-selected', String(b === btn));
        });
      }
    }
  });
}

/* --------------------------------------------------------------------------
   3. HTMX LIFECYCLE INTEGRATION & FILTER TAB ACTIVE STATES
   -------------------------------------------------------------------------- */
function initHtmxHooks() {
  /* Update active pill state on HTMX filter bars */
  document.addEventListener('click', (e) => {
    const filterBtn = e.target.closest('[data-filter-pill]');
    if (filterBtn) {
      const group = filterBtn.closest('.control-group');
      if (group) {
        group.querySelectorAll('[data-filter-pill]').forEach((b) => {
          b.classList.toggle('is-active', b === filterBtn);
          b.setAttribute('aria-selected', String(b === filterBtn));
        });
      }
    }

    /* Open drawer when clicking a case study trigger */
    const openDrawerTrigger = e.target.closest('[data-open-drawer]');
    if (openDrawerTrigger) {
      openDrawer();
    }

    /* Close drawer when clicking backdrop or close button */
    if (
      e.target.matches('[data-close-drawer]') ||
      e.target.closest('[data-close-drawer]') ||
      e.target.classList.contains('drawer-backdrop')
    ) {
      closeDrawer();
    }
  });

  /* Clean up WebGL contexts before HTMX removes DOM nodes */
  document.body.addEventListener('htmx:beforeCleanupElement', (event) => {
    cleanupThreeContainersIn(event.detail.elt);
  });

  /* Mount any newly swapped-in Three.js containers */
  document.body.addEventListener('htmx:afterSwap', (event) => {
    initAllThreeContainers(event.detail.target);
  });
}

/* --------------------------------------------------------------------------
   4. CASE STUDY DRAWER & PRESENTATION FULLSCREEN MODE
   -------------------------------------------------------------------------- */
function openDrawer() {
  const drawer = document.getElementById('case-study-drawer');
  if (!drawer) return;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const drawer = document.getElementById('case-study-drawer');
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initPresentationControls() {
  /* Fullscreen toggle for client/TV presentation mode */
  document.addEventListener('click', (e) => {
    const fsBtn = e.target.closest('[data-action="fullscreen"]');
    if (!fsBtn) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  });

  /* Keyboard shortcuts (Escape closes drawer, F toggles fullscreen) */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   5. LIVE VIEWPORT & DEVICE CLASS TELEMETRY (Mobile / Tablet / PC / TV)
   -------------------------------------------------------------------------- */
function initViewportTelemetry() {
  const badge = document.querySelector('[data-viewport-telemetry]');
  if (!badge) return;

  const update = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const orientation = w >= h ? 'HORIZ' : 'VERT';
    let device = 'PC';
    if (w < 720) device = 'MOBILE';
    else if (w <= 1100) device = 'TABLET';
    else if (w >= 2200) device = 'TV / 4K';

    badge.textContent = `${device} · ${w}×${h} (${orientation})`;
  };

  window.addEventListener('resize', update, { passive: true });
  update();
}

/* --------------------------------------------------------------------------
   BOOTSTRAP
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAspectSwitcher();
  initHtmxHooks();
  initPresentationControls();
  initViewportTelemetry();
  initAllThreeContainers(document);
});
