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
  const button = document.querySelector('[data-action="toggle-theme"]');
  if (button) {
    button.setAttribute('aria-label', current === 'light' ? 'Switch to dark' : 'Switch to light');
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
   iOS Safari and iOS Chrome cannot lock or fullscreen a page. The frame is
   sized to the visual viewport. Only a project marked landscape is turned
   90° on a portrait iPhone or iPad, or locked to landscape on Android.
   -------------------------------------------------------------------------- */
let portraitDismissed = false;
let launchWantsLandscape = false;

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

function isIOS() {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod|CriOS|FxiOS|EdgiOS/.test(ua)) return true;
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

function visualBox() {
  const vv = window.visualViewport;
  return {
    width: Math.round(vv ? vv.width : window.innerWidth),
    height: Math.round(vv ? vv.height : window.innerHeight),
    top: Math.round(vv ? vv.offsetTop : 0),
    left: Math.round(vv ? vv.offsetLeft : 0),
  };
}

function syncOrientNotice() {
  const layer = document.getElementById('launch-frame');
  const notice = layer?.querySelector('.launch-orient');
  if (!notice) return;
  const turned = layer.querySelector('.launch-frame-stage')?.classList.contains('is-turned');
  const show = isLaunchOpen() && launchWantsLandscape && isHandheld() && isPortrait() && !portraitDismissed && !turned;
  notice.hidden = !show;
}

function framedPageScrolls(frame) {
  return /rutas_turismo/.test(frame.getAttribute('src') || '');
}

function restorePageScroll() {
  const drawer = document.getElementById('case-study-drawer');
  const cv = document.getElementById('cv-frame');
  const locked = (drawer && drawer.classList.contains('is-open'))
    || (cv && cv.classList.contains('is-open'));
  document.body.style.overflow = locked ? 'hidden' : '';
}

const CV_SRC = 'partials/Curriculum_Vitae_Escala_OlimpO_II_Francisco_Jose_Bermejo_Tarifa.pdf';

function isCvOpen() {
  const layer = document.getElementById('cv-frame');
  return Boolean(layer && layer.classList.contains('is-open'));
}

function openCv() {
  const layer = document.getElementById('cv-frame');
  const frame = layer?.querySelector('.cv-view');
  if (!layer || !frame) return;
  if (!frame.getAttribute('src')) frame.src = CV_SRC;
  layer.classList.add('is-open');
  layer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  layer.querySelector('[data-cv-close]')?.focus({ preventScroll: true });
}

function closeCv() {
  const layer = document.getElementById('cv-frame');
  if (!layer || !layer.classList.contains('is-open')) return;
  layer.classList.remove('is-open');
  layer.setAttribute('aria-hidden', 'true');
  restorePageScroll();
}

function initCv() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-open-cv]')) {
      openCv();
      return;
    }
    if (
      event.target.closest('[data-cv-close]') ||
      event.target.classList.contains('cv-frame')
    ) {
      closeCv();
    }
  });
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
  if (!launchWantsLandscape || !isHandheld() || isIOS()) return;
  const request = layer.requestFullscreen || layer.webkitRequestFullscreen;
  const pending = request ? request.call(layer) : Promise.resolve();
  Promise.resolve(pending)
    .then(() => screen.orientation?.lock?.('landscape'))
    .catch(() => {})
    .finally(() => {
      layoutLaunchFrame();
      syncOrientNotice();
    });
}

function layoutLaunchFrame() {
  const layer = document.getElementById('launch-frame');
  const stage = layer?.querySelector('.launch-frame-stage');
  const frame = layer?.querySelector('.launch-frame-view');
  const bar = layer?.querySelector('.launch-frame-bar');
  if (!layer || !stage || !frame || !layer.classList.contains('is-open')) return;

  const box = visualBox();
  layer.style.top = box.top + 'px';
  layer.style.left = box.left + 'px';
  layer.style.width = box.width + 'px';
  layer.style.height = box.height + 'px';
  layer.style.transform = 'none';

  const barH = bar ? bar.offsetHeight : 0;
  const slotW = box.width;
  const slotH = Math.max(0, box.height - barH);
  const turn = launchWantsLandscape && isIOS() && isHandheld() && box.height > box.width && !portraitDismissed;
  stage.classList.toggle('is-turned', turn);

  if (turn) {
    stage.style.top = '0px';
    stage.style.left = slotW + 'px';
    stage.style.width = slotH + 'px';
    stage.style.height = slotW + 'px';
    stage.style.transformOrigin = 'top left';
    stage.style.transform = 'rotate(90deg)';
    frame.style.width = slotH + 'px';
    frame.style.height = slotW + 'px';
  } else {
    stage.style.top = '0px';
    stage.style.left = '0px';
    stage.style.width = '100%';
    stage.style.height = '100%';
    stage.style.transform = 'none';
    frame.style.width = slotW + 'px';
    frame.style.height = slotH + 'px';
  }
  syncOrientNotice();
  fitFramedDocument(frame);
}

function fitFramedDocument(frame) {
  const doc = frame.contentDocument;
  const win = frame.contentWindow;
  if (!doc || !win || !doc.head) return;
  if (!frame.getAttribute('src') || frame.getAttribute('src') === 'about:blank') return;

  const w = frame.clientWidth;
  const h = frame.clientHeight;
  if (!w || !h) return;

  const scrolls = framedPageScrolls(frame);
  const meta = doc.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute(
      'content',
      scrolls
        ? `width=${w}, initial-scale=1, viewport-fit=cover, shrink-to-fit=no`
        : `width=${w}, height=${h}, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, shrink-to-fit=no`,
    );
  }

  let style = doc.getElementById('launch-fit');
  if (!style) {
    style = doc.createElement('style');
    style.id = 'launch-fit';
    doc.head.appendChild(style);
  }
  const slides = doc.querySelectorAll('.slide').length || 6;
  style.textContent = scrolls
    ? `
    html {
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
    }
    body {
      width: auto !important;
      height: auto !important;
      min-height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      overflow: visible !important;
    }
    .app-wrapper {
      width: 100% !important;
      max-width: none !important;
      height: auto !important;
      min-height: 100% !important;
      max-height: none !important;
    }
  `
    : `
    html, body {
      width: ${w}px !important;
      height: ${h}px !important;
      min-width: 0 !important;
      min-height: 0 !important;
      max-width: ${w}px !important;
      max-height: ${h}px !important;
      overflow: hidden !important;
    }
    #canvas-container, #ui-layer, #pdf-modal, .presentation-container, .slide {
      width: ${w}px !important;
      max-width: ${w}px !important;
    }
    #canvas-container, #ui-layer, #pdf-modal {
      height: ${h}px !important;
      max-height: ${h}px !important;
    }
    .slider-wrapper { width: ${w * slides}px !important; }
  `;

  const key = `${w}x${h}`;
  const inner = win.innerWidth;
  if (Math.abs(inner - w) > 8 && frame.dataset.fitFor !== key) {
    frame.dataset.fitFor = key;
    try {
      const url = new URL(frame.src, window.location.href);
      url.searchParams.set('frame', key);
      frame.src = `${url.pathname}${url.search}`;
    } catch {
      /* keep the fitted stylesheet if the address cannot be rebuilt */
    }
  } else {
    win.dispatchEvent(new Event('resize'));
  }
}

function clearLaunchLayout(layer, frame) {
  const stage = layer.querySelector('.launch-frame-stage');
  ['top', 'left', 'width', 'height', 'transform'].forEach((prop) => {
    layer.style[prop] = '';
  });
  if (stage) {
    stage.classList.remove('is-turned');
    ['top', 'left', 'width', 'height', 'transform', 'transformOrigin'].forEach((prop) => {
      stage.style[prop] = '';
    });
  }
  if (frame) {
    frame.style.width = '';
    frame.style.height = '';
    delete frame.dataset.fitFor;
  }
}

function openLaunch(src, title, orient) {
  const layer = document.getElementById('launch-frame');
  const frame = layer?.querySelector('.launch-frame-view');
  if (!layer || !frame || !src) return;
  portraitDismissed = false;
  launchWantsLandscape = orient === 'landscape';
  frame.title = title || 'Project';
  frame.removeAttribute('src');
  layer.setAttribute('aria-label', frame.title);
  layer.classList.add('is-open');
  layer.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('launch-open');
  document.body.style.overflow = 'hidden';
  layoutLaunchFrame();
  frame.src = src;
  requestLandscape(layer);
  layer.querySelector('[data-launch-close]')?.focus({ preventScroll: true });
}

function closeLaunch() {
  const layer = document.getElementById('launch-frame');
  const frame = layer?.querySelector('.launch-frame-view');
  if (!layer || !layer.classList.contains('is-open')) return;
  layer.classList.remove('is-open');
  layer.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('launch-open');
  portraitDismissed = false;
  launchWantsLandscape = false;
  clearLaunchLayout(layer, frame);
  if (frame) {
    frame.src = 'about:blank';
    frame.title = 'Project';
  }
  unlockOrientation();
  leaveFullscreen();
  restorePageScroll();
}

function initLaunchFrame() {
  const frame = document.querySelector('#launch-frame .launch-frame-view');
  frame?.addEventListener('load', () => {
    if (!isLaunchOpen()) return;
    fitFramedDocument(frame);
  });

  document.addEventListener('click', (e) => {
    const launch = e.target.closest('[data-launch-frame]');
    if (launch) {
      e.preventDefault();
      openLaunch(
        launch.getAttribute('href'),
        launch.getAttribute('data-launch-title'),
        launch.getAttribute('data-launch-orient'),
      );
      return;
    }
    if (e.target.closest('[data-launch-close]')) {
      closeLaunch();
      return;
    }
    if (e.target.closest('[data-launch-continue]')) {
      portraitDismissed = true;
      layoutLaunchFrame();
    }
  });

  const onViewport = () => layoutLaunchFrame();
  window.visualViewport?.addEventListener('resize', onViewport);
  window.visualViewport?.addEventListener('scroll', onViewport);
  window.addEventListener('resize', onViewport);
  window.addEventListener('orientationchange', () => {
    setTimeout(onViewport, 50);
    setTimeout(onViewport, 300);
  });
}

/* --------------------------------------------------------------------------
   4. CAMPAIGN CAROUSEL
   -------------------------------------------------------------------------- */
function initCampaignCarousel() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    const slides = [...root.querySelectorAll('.campaign-slide')];
    const dots = [...root.querySelectorAll('[data-carousel-dots] button')];
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = 0;

    function show(next) {
      index = (next + slides.length) % slides.length;
      track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });
      dots.forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function stop() {
      window.clearInterval(timer);
      timer = 0;
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(() => show(index + 1), 6000);
    }

    root.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(index - 1));
    root.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

    root.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') show(index + 1);
      if (event.key === 'ArrowLeft') show(index - 1);
    });

    let startX = 0;
    let dragging = false;
    root.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      dragging = true;
      startX = event.clientX;
    });
    root.addEventListener('pointerup', (event) => {
      if (!dragging) return;
      dragging = false;
      const delta = event.clientX - startX;
      if (delta > 40) show(index - 1);
      else if (delta < -40) show(index + 1);
    });
    root.addEventListener('pointercancel', () => { dragging = false; });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', (event) => {
      if (!root.contains(event.relatedTarget)) start();
    });

    show(0);
    start();
  });
}

function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isLaunchOpen()) closeLaunch();
      else if (isCvOpen()) closeCv();
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
  initCv();
  initCampaignCarousel();
  initShortcuts();
  initAllThreeContainers(document);
});
