/**
 * ==========================================================================
 * APPLICATION CONTROLLER (main.js)
 * Weightless, diaphanous interface coordination.
 * ==========================================================================
 */

import {
  initAllThreeContainers,
  cleanupThreeContainersIn,
  refreshThreeThemes,
} from './three-stage.js';

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (Light Default / Dark Optional)
   -------------------------------------------------------------------------- */
function initTheme() {
  const saved = localStorage.getItem('site-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeLabel();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="toggle-theme"]');
    if (!btn) return;
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateThemeLabel();
    refreshThreeThemes();
  });
}

function updateThemeLabel() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const label = document.querySelector('[data-theme-label]');
  if (label) {
    label.textContent = current === 'light' ? 'DARK' : 'LIGHT';
  }
}

/* --------------------------------------------------------------------------
   2. HTMX FILTER & DRAWER HOOKS
   -------------------------------------------------------------------------- */
function initHtmxHooks() {
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('[data-filter-pill]');
    if (pill) {
      const bar = pill.closest('.filter-bar');
      if (bar) {
        bar.querySelectorAll('[data-filter-pill]').forEach((p) => {
          p.classList.toggle('is-active', p === pill);
          p.setAttribute('aria-selected', String(p === pill));
        });
      }
    }

    if (e.target.closest('[data-open-drawer]')) {
      openDrawer();
    }

    if (
      e.target.matches('[data-close-drawer]') ||
      e.target.closest('[data-close-drawer]') ||
      e.target.classList.contains('drawer-backdrop')
    ) {
      closeDrawer();
    }
  });

  document.body.addEventListener('htmx:beforeCleanupElement', (e) => {
    cleanupThreeContainersIn(e.detail.elt);
  });

  document.body.addEventListener('htmx:afterSwap', (e) => {
    initAllThreeContainers(e.detail.target);
  });
}

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

/* --------------------------------------------------------------------------
   3. KEYBOARD SHORTCUTS
   -------------------------------------------------------------------------- */
function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   BOOTSTRAP
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHtmxHooks();
  initShortcuts();
  initAllThreeContainers(document);
});
