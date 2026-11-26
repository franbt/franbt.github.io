/**
 * ==========================================================================
 * CAROUSEL VIEWER CONTROLLER (carousel-viewer.js)
 * Native scroll-snap + CSS order continuous looping + live markers & a11y
 * ==========================================================================
 */

function syncThemeFromHost() {
  const root = document.documentElement;
  try {
    if (window.parent && window.parent !== window && window.parent.document) {
      const parentRoot = window.parent.document.documentElement;
      const copyAttrs = () => {
        const mood = parentRoot.getAttribute('data-mood');
        const theme = parentRoot.getAttribute('data-theme');
        if (mood) root.setAttribute('data-mood', mood);
        if (theme) root.setAttribute('data-theme', theme);
      };
      copyAttrs();
      const observer = new MutationObserver(copyAttrs);
      observer.observe(parentRoot, {
        attributes: true,
        attributeFilter: ['data-mood', 'data-theme'],
      });
      return;
    }
  } catch {
    /* Cross-origin fallback */
  }

  const h = new Date().getHours();
  const mood = (h >= 7 && h <= 11) ? 'morning'
    : (h >= 12 && h <= 16) ? 'afternoon'
    : (h >= 17 && h <= 19) ? 'evening'
    : 'night';
  root.setAttribute('data-mood', mood);
  root.setAttribute('data-theme', mood === 'night' ? 'dark' : 'light');
}

function initCarousel(root) {
  const track = root.querySelector('.carousel-track');
  const prevBtn = root.querySelector('[data-direction="previous"]');
  const nextBtn = root.querySelector('[data-direction="next"]');
  const markersNav = root.querySelector('.carousel-markers');
  const statusEl = root.querySelector('[role="status"]');
  const counterEl = root.querySelector('[data-carousel-counter]');
  const captionEl = root.querySelector('[data-carousel-caption]');

  if (!track) return;
  const slides = [...track.children];
  const total = slides.length;
  if (!total) return;

  const canLoop = total >= 3;
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Fallback for browsers without CSS sibling-count()
  if (canLoop && !CSS.supports('order: sibling-count()')) {
    track.style.setProperty('--children-count', String(total));
  }

  // Build marker buttons from slide metadata
  const markers = slides.map((slide, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', slide.dataset.markerName || `Ir a la diapositiva ${idx + 1}`);
    btn.dataset.slideIndex = String(idx);
    markersNav?.appendChild(btn);
    return btn;
  });

  let settledIndex = -1;
  let activeMarkerIndex = -1;
  let pendingTarget = null;
  let requestedFromScrollLeft = null;
  let queuedStep = 0;
  let rafId = 0;
  let scrollDebounceId = 0;
  let unparkedForMarker = false;

  function scrollBehavior() {
    return reduceMotionQuery.matches ? 'instant' : 'smooth';
  }

  function slideCenterOffset(slide) {
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    return (slideRect.left + slideRect.width / 2) - (trackRect.left + trackRect.width / 2);
  }

  function slidesInVisualOrder() {
    return [...slides].sort(
      (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left,
    );
  }

  function findNearestSlide() {
    let best = slides[0];
    let bestDist = Infinity;
    for (const slide of slides) {
      const dist = Math.abs(slideCenterOffset(slide));
      if (dist < bestDist) {
        bestDist = dist;
        best = slide;
      }
    }
    return best;
  }

  function updateMarkerUi(index) {
    if (index === activeMarkerIndex) return;
    activeMarkerIndex = index;
    markers.forEach((btn, i) => {
      if (i === index) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
    if (counterEl) {
      counterEl.textContent = `${index + 1} / ${total}`;
    }
    if (captionEl) {
      const img = slides[index].querySelector('img');
      captionEl.textContent = img?.alt || '';
    }
  }

  function compensateReorder(anchorSlide, mutate, { lockOverflow = true } = {}) {
    const before = anchorSlide.getBoundingClientRect().left;
    const prevSnap = track.style.scrollSnapType;
    const prevBehavior = track.style.scrollBehavior;

    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    if (lockOverflow) track.style.overflowX = 'hidden';

    mutate();

    const after = anchorSlide.getBoundingClientRect().left;
    const delta = after - before;
    if (Math.abs(delta) > 0.5) {
      track.scrollLeft += delta;
    }

    track.style.scrollSnapType = prevSnap;
    track.style.scrollBehavior = prevBehavior;

    if (lockOverflow) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.overflowX = '';
        });
      });
    }
  }

  function applyParking(index, { lockOverflow = true } = {}) {
    if (!canLoop) return;
    const currentValue = track.style.getPropertyValue('--current').trim();
    const nextValue = String(index);
    if (currentValue === nextValue) return;
    const anchor = slides[index];
    compensateReorder(
      anchor,
      () => {
        track.style.setProperty('--current', nextValue);
      },
      { lockOverflow },
    );
  }

  function scrollToSlide(slide) {
    const offset = slideCenterOffset(slide);
    if (Math.abs(offset) < 1) return false;
    requestedFromScrollLeft = track.scrollLeft;
    track.scrollBy({ left: offset, behavior: scrollBehavior() });
    return true;
  }

  function step(direction) {
    // If slides are temporarily unparked for a marker trip, hold the step and replay on settle
    if (unparkedForMarker) {
      queuedStep += direction;
      return;
    }

    const visual = slidesInVisualOrder();
    const baseSlide = pendingTarget || findNearestSlide();
    const visualPos = visual.indexOf(baseSlide);
    if (visualPos === -1) return;

    const targetPos = visualPos + direction;
    if (targetPos < 0 || targetPos >= visual.length) return;

    const targetSlide = visual[targetPos];
    const targetIdx = slides.indexOf(targetSlide);
    pendingTarget = targetSlide;
    updateMarkerUi(targetIdx);
    const moved = scrollToSlide(targetSlide);
    if (!moved) {
      pendingTarget = null;
      handleSettle(true);
    }
  }

  function goToMarker(targetIdx) {
    const currentSlide = findNearestSlide();
    const currentIdx = slides.indexOf(currentSlide);
    if (targetIdx === currentIdx && !pendingTarget) return;

    const targetSlide = slides[targetIdx];
    pendingTarget = targetSlide;
    updateMarkerUi(targetIdx);

    if (canLoop) {
      unparkedForMarker = true;
      compensateReorder(
        currentSlide,
        () => {
          track.style.setProperty('--current', 'initial');
        },
        { lockOverflow: false },
      );
    }

    const moved = scrollToSlide(targetSlide);
    if (!moved) {
      unparkedForMarker = false;
      pendingTarget = null;
      handleSettle(true);
    }
  }

  function handleSettle(announceChange) {
    // Ignore stale settle at the exact position a new scroll was just requested from
    if (
      pendingTarget &&
      requestedFromScrollLeft !== null &&
      Math.abs(track.scrollLeft - requestedFromScrollLeft) < 1
    ) {
      return;
    }

    const nearest = findNearestSlide();
    const idx = slides.indexOf(nearest);

    // If a scripted scroll was redirected to a newer target, ignore intermediate settle
    if (pendingTarget && nearest !== pendingTarget && Math.abs(slideCenterOffset(pendingTarget)) > 2) {
      return;
    }

    pendingTarget = null;
    requestedFromScrollLeft = null;
    const hadQueued = queuedStep;
    queuedStep = 0;
    const wasMarkerTrip = unparkedForMarker;
    unparkedForMarker = false;

    updateMarkerUi(idx);
    applyParking(idx, { lockOverflow: !(wasMarkerTrip && hadQueued !== 0) });

    if (announceChange && idx !== settledIndex && statusEl) {
      const slideLabel = nearest.getAttribute('aria-label') || `${idx + 1} de ${total}`;
      const imgAlt = nearest.querySelector('img')?.alt || '';
      statusEl.textContent = imgAlt ? `${slideLabel}. ${imgAlt}` : slideLabel;
    }
    settledIndex = idx;

    if (hadQueued !== 0) {
      step(Math.sign(hadQueued));
    }
  }

  // Controls
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  markers.forEach((btn, idx) => {
    btn.addEventListener('click', () => goToMarker(idx));
  });

  // Live marker tracking (throttled to rAF, skipped during scripted scroll)
  track.addEventListener(
    'scroll',
    () => {
      if (!pendingTarget && !rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (pendingTarget) return;
          const nearest = findNearestSlide();
          updateMarkerUi(slides.indexOf(nearest));
        });
      }

      // Fallback settle listener ONLY where scrollend is unsupported
      if (!('onscrollend' in window)) {
        window.clearTimeout(scrollDebounceId);
        scrollDebounceId = window.setTimeout(() => handleSettle(true), 120);
      }
    },
    { passive: true },
  );

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', () => handleSettle(true));
  }

  // Keyboard arrow shortcuts when not inside a nested interactive control
  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const target = event.target;
    if (target instanceof Element && target.closest('a, button, input, select, textarea')) return;
    event.preventDefault();
    step(event.key === 'ArrowRight' ? 1 : -1);
  });

  // Keep active slide centered on viewport resize
  window.addEventListener('resize', () => {
    const active = slides[Math.max(0, settledIndex)];
    if (!active) return;
    const offset = slideCenterOffset(active);
    if (Math.abs(offset) > 1) {
      track.scrollBy({ left: offset, behavior: 'instant' });
    }
  });

  // Initial silent sync on load
  updateMarkerUi(0);
  applyParking(0, { lockOverflow: false });
  settledIndex = 0;
}

document.addEventListener('DOMContentLoaded', () => {
  syncThemeFromHost();
  document.querySelectorAll('.carousel').forEach(initCarousel);
});
