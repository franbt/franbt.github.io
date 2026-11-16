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
   2. HTMX DRAWER HOOKS
   -------------------------------------------------------------------------- */
function initHtmxHooks() {
  document.addEventListener('click', (e) => {
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
  if (!isLaunchOpen()) document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   3. LAUNCH FRAME
   -------------------------------------------------------------------------- */
let portraitDismissed = false;

function isLaunchOpen() {
  const layer = document.getElementById('launch-frame');
  return Boolean(layer && layer.classList.contains('is-open'));
}

function isHandheld() {
  return window.matchMedia('(pointer: coarse)').matches;
}

function isPortrait() {
  return window.matchMedia('(orientation: portrait)').matches;
}

function syncOrientNotice() {
  const notice = document.querySelector('#launch-frame .launch-orient');
  if (!notice) return;
  const show = isLaunchOpen() && isHandheld() && isPortrait() && !portraitDismissed;
  notice.hidden = !show;
}

function restorePageScroll() {
  const drawer = document.getElementById('case-study-drawer');
  const drawerOpen = drawer && drawer.classList.contains('is-open');
  document.body.style.overflow = drawerOpen ? 'hidden' : '';
}

async function leaveFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  if (!exit || !(document.fullscreenElement || document.webkitFullscreenElement)) return;
  try {
    await exit.call(document);
  } catch {
    /* already left fullscreen */
  }
}

function unlockOrientation() {
  try {
    screen.orientation?.unlock?.();
  } catch {
    /* unlock is unavailable outside a locked session */
  }
}

function requestLandscape(layer) {
  if (!isHandheld()) return;
  const request = layer.requestFullscreen || layer.webkitRequestFullscreen;
  const pending = request ? request.call(layer) : Promise.resolve();
  Promise.resolve(pending)
    .then(() => screen.orientation?.lock?.('landscape'))
    .catch(() => {})
    .finally(syncOrientNotice);
}

function openLaunch(src, title) {
  const layer = document.getElementById('launch-frame');
  const frame = layer?.querySelector('.launch-frame-view');
  if (!layer || !frame || !src) return;
  portraitDismissed = false;
  frame.title = title || 'Project';
  frame.src = src;
  layer.setAttribute('aria-label', frame.title);
  layer.classList.add('is-open');
  layer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  syncOrientNotice();
  requestLandscape(layer);
  layer.querySelector('[data-launch-close]')?.focus();
}

function closeLaunch() {
  const layer = document.getElementById('launch-frame');
  const frame = layer?.querySelector('.launch-frame-view');
  if (!layer || !layer.classList.contains('is-open')) return;
  layer.classList.remove('is-open');
  layer.setAttribute('aria-hidden', 'true');
  portraitDismissed = false;
  if (frame) {
    frame.src = 'about:blank';
    frame.title = 'Project';
  }
  unlockOrientation();
  leaveFullscreen();
  restorePageScroll();
}

function initLaunchFrame() {
  document.addEventListener('click', (e) => {
    const launch = e.target.closest('[data-launch-frame]');
    if (launch) {
      e.preventDefault();
      openLaunch(launch.getAttribute('href'), launch.getAttribute('data-launch-title'));
      return;
    }
    if (e.target.closest('[data-launch-close]')) {
      closeLaunch();
      return;
    }
    if (e.target.closest('[data-launch-continue]')) {
      portraitDismissed = true;
      syncOrientNotice();
    }
  });

  const portrait = window.matchMedia('(orientation: portrait)');
  const onOrient = () => syncOrientNotice();
  if (portrait.addEventListener) portrait.addEventListener('change', onOrient);
  else portrait.addListener(onOrient);
  window.addEventListener('orientationchange', onOrient);
}

/* --------------------------------------------------------------------------
   4. KEYBOARD SHORTCUTS
   -------------------------------------------------------------------------- */
function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isLaunchOpen()) closeLaunch();
      else closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   BOOTSTRAP
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHtmxHooks();
  initLaunchFrame();
  initShortcuts();
  initAllThreeContainers(document);
});
