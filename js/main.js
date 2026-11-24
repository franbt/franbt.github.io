/**
 * ==========================================================================
 * APPLICATION CONTROLLER (main.js)
 * Portfolio 2026 — Responsive across Mobile, Tablet, Laptop, PC & TV
 * ==========================================================================
 */

import {
  initAllThreeContainers,
  cleanupThreeContainersIn,
  refreshThreeThemes,
} from './three-stage.js';

/* --------------------------------------------------------------------------
   0. LIVE REGION ANNOUNCER (Centralized Polite Updates)
   -------------------------------------------------------------------------- */
let announceTimer = 0;

function announce(message) {
  const region = document.getElementById('live-announcer');
  if (!region || !message) return;
  window.clearTimeout(announceTimer);
  region.textContent = '';
  announceTimer = window.setTimeout(() => {
    region.textContent = message;
  }, 60);
}

/* --------------------------------------------------------------------------
   1. TIME-OF-DAY MOOD PALETTE + THEME TOGGLE
   Evaluated once when the page opens/reloads (no background interval).
   Morning: 07-11 | Afternoon: 12-16 | Evening: 17-19 | Night: 20-06
   -------------------------------------------------------------------------- */
const MOOD_LABELS = {
  morning: 'Mañana',
  afternoon: 'Tarde',
  evening: 'Atardecer',
  night: 'Noche',
};

function getMoodForHour(hour = new Date().getHours()) {
  if (hour >= 7 && hour <= 11) return 'morning';
  if (hour >= 12 && hour <= 16) return 'afternoon';
  if (hour >= 17 && hour <= 19) return 'evening';
  return 'night';
}

function applyMood(mood, { announceChange = false } = {}) {
  const validMood = MOOD_LABELS[mood] ? mood : getMoodForHour();
  const isNight = validMood === 'night';
  document.documentElement.setAttribute('data-mood', validMood);
  document.documentElement.setAttribute('data-theme', isNight ? 'dark' : 'light');
  updateThemeButton();
  refreshThreeThemes();
  if (announceChange) {
    announce(`Paleta de ${MOOD_LABELS[validMood]} activada.`);
  }
}

function updateThemeButton() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.querySelector('[data-action="toggle-theme"]');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

function initTheme() {
  // Apply once on load based on current hour (no background timer)
  const initialMood = getMoodForHour();
  const dayMood = initialMood === 'night' ? 'afternoon' : initialMood;
  applyMood(initialMood, { announceChange: false });

  document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('[data-action="toggle-theme"]');
    if (!themeBtn) return;
    const isCurrentlyNight = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextMood = isCurrentlyNight ? dayMood : 'night';
    applyMood(nextMood, { announceChange: true });
  });
}

/* --------------------------------------------------------------------------
   2. CATEGORY FILTER & LAPTOP INDEX RAIL SYNC
   -------------------------------------------------------------------------- */
function initFilters() {
  const pills = [...document.querySelectorAll('[data-filter]')];
  const slots = [...document.querySelectorAll('#work-target > .stage-slot')];
  const indexLinks = [...document.querySelectorAll('[data-index-link]')];
  if (!pills.length || !slots.length) return;

  function applyFilter(category, triggerEl) {
    let visibleCount = 0;

    slots.forEach((slot) => {
      const match = category === 'all' || slot.dataset.category === category;
      slot.hidden = !match;
      if (match) visibleCount += 1;
    });

    indexLinks.forEach((link) => {
      const match = category === 'all' || link.dataset.category === category;
      link.hidden = !match;
      link.parentElement.hidden = !match;
    });

    // Reset roving tabindex in index rail to first visible link
    const visibleLinks = indexLinks.filter((l) => !l.hidden);
    visibleLinks.forEach((l, i) => {
      l.setAttribute('tabindex', i === 0 ? '0' : '-1');
    });

    pills.forEach((pill) => {
      pill.setAttribute('aria-pressed', String(pill.dataset.filter === category));
    });

    if (triggerEl) {
      const label = triggerEl.childNodes[0]?.textContent?.trim() || category;
      announce(`Mostrando ${visibleCount} ${visibleCount === 1 ? 'proyecto' : 'proyectos'} en ${label}.`);
    }
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => applyFilter(pill.dataset.filter, pill));
  });
}

/* --------------------------------------------------------------------------
   3. LAPTOP STICKY INDEX SCROLLSPY
   -------------------------------------------------------------------------- */
function initScrollspy() {
  const slots = [...document.querySelectorAll('#work-target > .stage-slot[id]')];
  const linkMap = new Map(
    [...document.querySelectorAll('[data-index-link]')].map((el) => [el.dataset.indexLink, el]),
  );
  if (!slots.length || !linkMap.size || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const id = visible.target.id;
      linkMap.forEach((link, key) => {
        const active = key === id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] },
  );

  slots.forEach((slot) => observer.observe(slot));
}

/* --------------------------------------------------------------------------
   4. SPATIAL NAVIGATION (2D Edge-based Geometry for Composite Widgets)
   Follows modern-web-guidance spatial-navigation:
   - Edge-based direction filter
   - Overlap-first preference, weighted fallback (w = 2)
   - checkVisibility() filter, live getBoundingClientRect()
   - Preserves native browser scrolling when no candidate exists
   -------------------------------------------------------------------------- */
function initSpatialNavigation() {
  const grids = document.querySelectorAll('[data-spatial-grid]');
  const DIRS = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  };

  function isEditableTarget(el) {
    if (!el || !(el instanceof Element)) return false;
    return el.matches(':read-write, select, input[type="range"], [role="slider"]');
  }

  function findBestCandidate(currentEl, candidates, dir) {
    const cur = currentEl.getBoundingClientRect();
    const curCx = cur.left + cur.width / 2;
    const curCy = cur.top + cur.height / 2;
    const tolerance = 2;

    const aligned = [];
    const fallback = [];

    for (const el of candidates) {
      if (el === currentEl) continue;
      if (typeof el.checkVisibility === 'function' && !el.checkVisibility()) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;

      let gap = Infinity;
      let overlaps = false;
      let perpOffset = 0;

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      if (dir === 'right') {
        if (r.left < cur.right - tolerance) continue;
        gap = Math.max(0, r.left - cur.right);
        overlaps = r.bottom > cur.top && r.top < cur.bottom;
        perpOffset = Math.abs(cy - curCy);
      } else if (dir === 'left') {
        if (r.right > cur.left + tolerance) continue;
        gap = Math.max(0, cur.left - r.right);
        overlaps = r.bottom > cur.top && r.top < cur.bottom;
        perpOffset = Math.abs(cy - curCy);
      } else if (dir === 'down') {
        if (r.top < cur.bottom - tolerance) continue;
        gap = Math.max(0, r.top - cur.bottom);
        overlaps = r.right > cur.left && r.left < cur.right;
        perpOffset = Math.abs(cx - curCx);
      } else if (dir === 'up') {
        if (r.bottom > cur.top + tolerance) continue;
        gap = Math.max(0, cur.top - r.bottom);
        overlaps = r.right > cur.left && r.left < cur.right;
        perpOffset = Math.abs(cx - curCx);
      }

      if (overlaps) {
        aligned.push({ el, gap, perpOffset });
      } else {
        fallback.push({ el, score: gap + 2 * perpOffset });
      }
    }

    if (aligned.length) {
      aligned.sort((a, b) => a.gap - b.gap || a.perpOffset - b.perpOffset);
      return aligned[0].el;
    }

    if (fallback.length) {
      fallback.sort((a, b) => a.score - b.score);
      return fallback[0].el;
    }

    return null;
  }

  grids.forEach((grid) => {
    grid.addEventListener('keydown', (e) => {
      const dir = DIRS[e.key];
      if (!dir || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      const innerTarget = e.composedPath()[0];
      if (isEditableTarget(innerTarget)) return;

      const candidates = [...grid.querySelectorAll('[role="gridcell"]')].filter(
        (el) => !el.hidden && (typeof el.checkVisibility !== 'function' || el.checkVisibility()),
      );
      if (!candidates.includes(document.activeElement)) return;

      const next = findBestCandidate(document.activeElement, candidates, dir);
      if (!next) return; // Preserve native scrolling at boundary

      e.preventDefault();
      candidates.forEach((el) => el.setAttribute('tabindex', el === next ? '0' : '-1'));
      next.focus();
      next.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });
}

/* --------------------------------------------------------------------------
   5. NATIVE <dialog> TOP-LAYER ANIMATION & LIGHT-DISMISS HELPERS
   Includes Firefox/Safari discrete display exit fallback + Safari closedBy fallback
   -------------------------------------------------------------------------- */
let supportsDisplayTransition;

function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit() {
  return window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay();
}

async function closeTopLayer(dialog) {
  if (!dialog || !dialog.open) return;
  if (!supportsTopLayerExit()) {
    if (dialog.hasAttribute('data-closing')) return;
    dialog.setAttribute('data-closing', '');
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 600)),
      ]);
    }
    if (!dialog.hasAttribute('data-closing')) return;
    dialog.removeAttribute('data-closing');
  }
  dialog.close();
}

function attachDialogFallbacks(dialog) {
  if (!dialog) return;

  // Route native cancel (Esc / closedby light-dismiss) through exit transition
  dialog.addEventListener('cancel', (event) => {
    if (!supportsTopLayerExit()) {
      event.preventDefault();
      closeTopLayer(dialog);
    }
  });

  // Fallback for browsers without <dialog closedby="any"> support (e.g. Safari)
  if (dialog.getAttribute('closedby') === 'any' && !('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const insideContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!insideContent) closeTopLayer(dialog);
    });
  }
}

/* --------------------------------------------------------------------------
   5b. CASE STUDY DRAWER (Cached Fetch -> Zero Stale Flash, Smooth Entry/Exit)
   -------------------------------------------------------------------------- */
const caseStudyCache = new Map();
let lastDrawerTrigger = null;
let drawerAbort = null;

async function openCaseStudy(url, triggerEl) {
  const drawer = document.getElementById('case-study-drawer');
  const content = document.getElementById('drawer-content');
  if (!drawer || !content || !url) return;

  if (drawerAbort) drawerAbort.abort();
  drawerAbort = new AbortController();
  lastDrawerTrigger = triggerEl || document.activeElement;

  let html = caseStudyCache.get(url);
  if (!html) {
    triggerEl?.setAttribute('aria-busy', 'true');
    try {
      const res = await fetch(url, { signal: drawerAbort.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
      caseStudyCache.set(url, html);
    } catch (err) {
      if (err.name === 'AbortError') return;
      html = `
        <div class="drawer-top">
          <h2 id="drawer-title" class="type-headline">No se pudo cargar el estudio</h2>
          <button type="button" class="btn-line" data-close-drawer>Cerrar &times;</button>
        </div>
        <p class="prose-clean">Comprueba que el servidor local está activo e inténtalo de nuevo.</p>
      `;
    } finally {
      triggerEl?.removeAttribute('aria-busy');
    }
  }

  cleanupThreeContainersIn(content);
  content.innerHTML = html;
  initAllThreeContainers(content);

  drawer.removeAttribute('data-closing');
  drawer.scrollTop = 0;
  if (!drawer.open) drawer.showModal();
  content.querySelector('[data-close-drawer]')?.focus({ preventScroll: true });
}

function closeDrawer() {
  const drawer = document.getElementById('case-study-drawer');
  if (drawer && drawer.open) closeTopLayer(drawer);
}

function initHtmxHooks() {
  const drawer = document.getElementById('case-study-drawer');
  attachDialogFallbacks(drawer);

  drawer?.addEventListener('close', () => {
    drawer.removeAttribute('data-closing');
    if (lastDrawerTrigger && typeof lastDrawerTrigger.focus === 'function') {
      lastDrawerTrigger.focus({ preventScroll: true });
      lastDrawerTrigger = null;
    }
  });

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-drawer]');
    if (opener) {
      const url = opener.getAttribute('data-case-study') || opener.getAttribute('hx-get');
      if (url) {
        e.preventDefault();
        openCaseStudy(url, opener);
      }
      return;
    }

    if (e.target.closest('[data-close-drawer]')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   6. NATIVE <dialog> CV VIEWER
   -------------------------------------------------------------------------- */
const CV_SRC = 'partials/Curriculum_Vitae_Escala_OlimpO_II_Francisco_Jose_Bermejo_Tarifa.pdf';
let lastCvTrigger = null;

function openCv(triggerEl) {
  const dialog = document.getElementById('cv-frame');
  const frame = dialog?.querySelector('.cv-view');
  if (!dialog || !frame) return;
  lastCvTrigger = triggerEl || document.activeElement;
  if (!frame.getAttribute('src')) frame.src = CV_SRC;
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('[data-cv-close]')?.focus({ preventScroll: true });
}

function closeCv() {
  const dialog = document.getElementById('cv-frame');
  if (dialog && dialog.open) dialog.close();
}

function initCv() {
  const dialog = document.getElementById('cv-frame');
  attachDialogFallbacks(dialog);

  dialog?.addEventListener('close', () => {
    if (lastCvTrigger && typeof lastCvTrigger.focus === 'function') {
      lastCvTrigger.focus({ preventScroll: true });
      lastCvTrigger = null;
    }
  });

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-cv]');
    if (opener) {
      openCv(opener);
      return;
    }
    if (e.target.closest('[data-cv-close]')) {
      closeCv();
    }
  });
}

/* --------------------------------------------------------------------------
   7. NATIVE <dialog> LAUNCH FRAME (Interactive 3D & Presentation Embeds)
   -------------------------------------------------------------------------- */
let portraitDismissed = false;
let launchWantsLandscape = false;
let lastLaunchTrigger = null;

function isLaunchOpen() {
  const layer = document.getElementById('launch-frame');
  return Boolean(layer && layer.open);
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

async function leaveFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  if (!exit || !(document.fullscreenElement || document.webkitFullscreenElement)) return;
  try {
    await exit.call(document);
  } catch {
    /* ignore */
  }
}

function unlockOrientation() {
  try {
    screen.orientation?.unlock?.();
  } catch {
    /* ignore */
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
  if (!layer || !stage || !frame || !layer.open) return;

  const box = visualBox();
  layer.style.top = `${box.top}px`;
  layer.style.left = `${box.left}px`;
  layer.style.width = `${box.width}px`;
  layer.style.height = `${box.height}px`;

  const barH = bar ? bar.offsetHeight : 0;
  const slotW = box.width;
  const slotH = Math.max(0, box.height - barH);
  const turn = launchWantsLandscape && isIOS() && isHandheld() && box.height > box.width && !portraitDismissed;
  stage.classList.toggle('is-turned', turn);

  if (turn) {
    stage.style.top = '0px';
    stage.style.left = `${slotW}px`;
    stage.style.width = `${slotH}px`;
    stage.style.height = `${slotW}px`;
    stage.style.transformOrigin = 'top left';
    stage.style.transform = 'rotate(90deg)';
    frame.style.width = `${slotH}px`;
    frame.style.height = `${slotW}px`;
  } else {
    stage.style.top = '0px';
    stage.style.left = '0px';
    stage.style.width = '100%';
    stage.style.height = '100%';
    stage.style.transform = 'none';
    frame.style.width = `${slotW}px`;
    frame.style.height = `${slotH}px`;
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
  let style = doc.getElementById('launch-fit');
  if (!style) {
    style = doc.createElement('style');
    style.id = 'launch-fit';
    doc.head.appendChild(style);
  }
  const slides = doc.querySelectorAll('.slide').length || 6;
  style.textContent = scrolls
    ? `
      html { height: auto !important; max-height: none !important; overflow: visible !important; }
      body { width: auto !important; height: auto !important; min-height: 100% !important; max-width: none !important; max-height: none !important; overflow: visible !important; }
      .app-wrapper { width: 100% !important; max-width: none !important; height: auto !important; min-height: 100% !important; max-height: none !important; }
    `
    : `
      html, body { width: ${w}px !important; height: ${h}px !important; min-width: 0 !important; min-height: 0 !important; max-width: ${w}px !important; max-height: ${h}px !important; overflow: hidden !important; }
      #canvas-container, #ui-layer, #pdf-modal, .presentation-container, .slide { width: ${w}px !important; max-width: ${w}px !important; }
      #canvas-container, #ui-layer, #pdf-modal { height: ${h}px !important; max-height: ${h}px !important; }
      .slider-wrapper { width: ${w * slides}px !important; }
    `;

  win.dispatchEvent(new Event('resize'));
}

function cleanupLaunch(layer, frame) {
  const stage = layer.querySelector('.launch-frame-stage');
  ['top', 'left', 'width', 'height'].forEach((prop) => { layer.style[prop] = ''; });
  if (stage) {
    stage.classList.remove('is-turned');
    ['top', 'left', 'width', 'height', 'transform', 'transformOrigin'].forEach((prop) => {
      stage.style[prop] = '';
    });
  }
  if (frame) {
    frame.style.width = '';
    frame.style.height = '';
    frame.src = 'about:blank';
    frame.title = 'Visor interactivo del proyecto';
  }
  portraitDismissed = false;
  launchWantsLandscape = false;
  unlockOrientation();
  leaveFullscreen();
}

function openLaunch(src, title, orient, triggerEl) {
  const layer = document.getElementById('launch-frame');
  const frame = layer?.querySelector('.launch-frame-view');
  const titleEl = document.getElementById('launch-frame-title');
  if (!layer || !frame || !src) return;

  // Close drawer if launch was triggered from inside case study
  closeDrawer();

  lastLaunchTrigger = triggerEl || document.activeElement;
  portraitDismissed = false;
  launchWantsLandscape = orient === 'landscape';
  frame.title = title || 'Visor interactivo del proyecto';
  if (titleEl) titleEl.textContent = title || 'Proyecto';

  frame.removeAttribute('src');
  if (!layer.open) layer.showModal();
  layoutLaunchFrame();
  frame.src = src;
  requestLandscape(layer);
  layer.querySelector('[data-launch-close]')?.focus({ preventScroll: true });
}

function initLaunchFrame() {
  const layer = document.getElementById('launch-frame');
  const frame = layer?.querySelector('.launch-frame-view');

  frame?.addEventListener('load', () => {
    if (isLaunchOpen()) fitFramedDocument(frame);
  });

  layer?.addEventListener('close', () => {
    cleanupLaunch(layer, frame);
    if (lastLaunchTrigger && typeof lastLaunchTrigger.focus === 'function') {
      lastLaunchTrigger.focus({ preventScroll: true });
      lastLaunchTrigger = null;
    }
  });

  document.addEventListener('click', (e) => {
    const launch = e.target.closest('[data-launch-frame]');
    if (launch) {
      e.preventDefault();
      openLaunch(
        launch.getAttribute('href'),
        launch.getAttribute('data-launch-title'),
        launch.getAttribute('data-launch-orient'),
        launch,
      );
      return;
    }
    if (e.target.closest('[data-launch-close]')) {
      layer?.close();
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
    setTimeout(onViewport, 80);
    setTimeout(onViewport, 300);
  });
}

/* --------------------------------------------------------------------------
   8. ACCESSIBLE CAMPAIGN CAROUSEL (WCAG 2.2.2 Pause + Keyboard + Swipe)
   -------------------------------------------------------------------------- */
function initCampaignCarousel() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = [...root.querySelectorAll('.campaign-slide')];
    const dots = [...root.querySelectorAll('[data-carousel-dots] button')];
    const counter = root.querySelector('[data-carousel-counter]');
    const pauseBtn = root.querySelector('[data-carousel-pause]');
    if (!slides.length) return;

    let index = 0;
    let timer = 0;
    let userPaused = reduceMotion;

    function syncPauseUi() {
      if (!pauseBtn) return;
      pauseBtn.setAttribute('aria-pressed', String(userPaused));
      pauseBtn.textContent = userPaused ? 'Reanudar' : 'Pausar';
      pauseBtn.setAttribute(
        'aria-label',
        userPaused ? 'Reanudar reproducción automática del carrusel' : 'Pausar reproducción automática del carrusel',
      );
    }

    function show(next, fromUser = false) {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle('is-on', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
      if (fromUser) {
        const imgAlt = slides[index].querySelector('img')?.alt || '';
        announce(`Diapositiva ${index + 1} de ${slides.length}. ${imgAlt}`);
      }
    }

    function stop() {
      window.clearInterval(timer);
      timer = 0;
    }

    function start() {
      if (userPaused || reduceMotion || timer) return;
      timer = window.setInterval(() => show(index + 1, false), 6500);
    }

    root.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(index - 1, true));
    root.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(index + 1, true));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i, true)));

    pauseBtn?.addEventListener('click', () => {
      userPaused = !userPaused;
      if (userPaused) stop();
      else start();
      syncPauseUi();
    });

    root.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + 1, true);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(index - 1, true);
      }
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
      if (delta > 40) show(index - 1, true);
      else if (delta < -40) show(index + 1, true);
    });
    root.addEventListener('pointercancel', () => { dragging = false; });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', (event) => {
      if (!root.contains(event.relatedTarget)) start();
    });

    syncPauseUi();
    show(0, false);
    start();
  });
}

/* --------------------------------------------------------------------------
   9. LOCAL VIDEO FACADE (Opt-in External Embed for Senderos UP)
   -------------------------------------------------------------------------- */
function initVideoFacades() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-load-video]');
    if (!btn) return;
    const facade = btn.closest('[data-video-facade]');
    if (!facade) return;
    const url = facade.getAttribute('data-embed-url');
    const title = facade.getAttribute('data-embed-title') || 'Vídeo del proyecto';
    if (!url) return;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
    iframe.focus();
  });
}

/* --------------------------------------------------------------------------
   BOOTSTRAP
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFilters();
  initScrollspy();
  initSpatialNavigation();
  initHtmxHooks();
  initLaunchFrame();
  initCv();
  initCampaignCarousel();
  initVideoFacades();
  initAllThreeContainers(document);
});
