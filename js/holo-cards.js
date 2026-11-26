/**
 * ==========================================================================
 * HOLOGRAM EMITTER BASE SHADER & POKÉMON-CARD 3D TILT (holo-cards.js)
 *
 * - Single shared offscreen WebGLRenderer (1 WebGL context total) running a
 *   custom Three.js GLSL hologram shader, blitted to each visible card's
 *   local 2D canvas for zero scroll lag and zero WebGL context exhaustion.
 * - Click-and-hold 3D tilt (stays flat on hover) with prismatic foil glare
 *   and CSS linear() spring-back on release.
 * - Adapts dynamically to the 4 time-of-day mood palettes & light/dark theme.
 * - Respects prefers-reduced-motion, visibilitychange, IntersectionObserver,
 *   and user ambient-motion pause toggle (WCAG 2.2.2 / 2.3.1).
 * ==========================================================================
 */

import * as THREE from 'three';

const HOLO_WIDTH = 960;
const HOLO_HEIGHT = 160;
const MAX_TILT_DEG = 12;
const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'iframe',
  'input',
  'select',
  'textarea',
  'summary',
  '[role="button"]',
  '[data-carousel-prev]',
  '[data-carousel-next]',
  '[data-carousel-dots]',
  '[data-carousel-pause]',
  '[data-load-video]',
].join(', ');

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uTilt;     // x: horizontal tilt (-1..1), y: vertical tilt (-1..1)
  uniform float uEnergy;   // 0.0 at rest -> 1.0 when actively pressed/tilted
  uniform float uDark;     // 0.0 light moods, 1.0 night/dark mood
  uniform float uSeed;     // per-card phase offset
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;

  // Smooth spectral iridescence helper (cos palette)
  vec3 prismPalette(float x) {
    return 0.56 + 0.44 * cos(6.28318 * (x + vec3(0.0, 0.33, 0.67)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime + uSeed * 6.2831;

    // Gentle focal shift when card is tilted
    float cx = 0.5 + uTilt.x * 0.07;
    float cy = 0.34 + uTilt.y * 0.025;

    // 1. Soft Architectural Floating Contact Shadow (sells the levitation)
    vec2 shadowDelta = (uv - vec2(cx, cy - 0.03)) / vec2(0.42, 0.14);
    float shadowDist2 = dot(shadowDelta, shadowDelta);
    float contactShadow = exp(-shadowDist2 * 3.4) * mix(0.24, 0.42, uDark) * (1.0 - 0.25 * uEnergy);

    // 2. Sleek Iridescent Levitation Pedestal Bar (clean luminous light-pad, no muddy target rings)
    vec2 padDelta = (uv - vec2(cx, cy)) / vec2(0.40, 0.105);
    float r = length(padDelta);

    // Smooth translucent glass-pad core + crisp thin iridescent perimeter hairline
    float padGlow = exp(-r * r * 2.6) * (0.42 + 0.36 * uEnergy);
    float rimLine = (1.0 - smoothstep(0.0, 0.085, abs(r - 0.92))) * (0.45 + 0.45 * uEnergy);
    // Subtle traveling light glint along the perimeter
    float angle = atan(padDelta.y, padDelta.x);
    float glint = 0.55 + 0.45 * cos(angle * 2.0 - t * 1.15 + uTilt.x * 3.0);
    rimLine *= glint;

    // 3. Ethereal Upward Hologram Mist (smooth vertical feather, zero aliased scanlines)
    float beamY = clamp((uv.y - cy) / max(0.001, 1.0 - cy), 0.0, 1.0);
    float halfW = mix(0.36, 0.46, beamY);
    float beamX = abs(uv.x - mix(cx, 0.5, beamY * 0.5));
    float beamHoriz = 1.0 - smoothstep(halfW * 0.15, halfW, beamX);
    float beamVert = smoothstep(0.0, 0.18, beamY) * pow(max(0.0001, 1.0 - beamY), 1.65);
    float aurora = 0.84 + 0.16 * sin(uv.x * 11.0 - t * 0.95 + uv.y * 3.5);
    float beam = beamHoriz * beamVert * aurora * (0.34 + 0.38 * uEnergy);

    // 4. Clean Iridescent Prism + Mood Accent Color (zero muddy complementary mixing)
    float phase = uv.x * 1.35 + uTilt.x * 0.45 - t * 0.12;
    vec3 prism = prismPalette(phase);
    vec3 moodTint = mix(uColorA, mix(uColorB, uColorC, 0.5 + 0.5 * sin(phase * 3.14)), 0.55);
    vec3 holoCol = mix(moodTint, prism, 0.52 + 0.22 * uEnergy);

    // Luminous opal highlight near center & rim
    vec3 glowCol = mix(holoCol, vec3(0.98, 0.99, 1.0), clamp(padGlow * 0.55 + rimLine * 0.4, 0.0, 0.78));

    // Composite clean contact shadow + luminous hologram glow
    float lightAlpha = clamp(padGlow + rimLine * 0.85 + beam, 0.0, 1.0);
    vec3 shadowCol = mix(vec3(0.10, 0.16, 0.24), vec3(0.02, 0.01, 0.05), uDark);

    // Smooth edge fade so canvas bounds are invisible
    float edgeMask =
      smoothstep(0.0, 0.07, uv.x) *
      (1.0 - smoothstep(0.93, 1.0, uv.x)) *
      smoothstep(0.0, 0.10, uv.y) *
      (1.0 - smoothstep(0.88, 1.0, uv.y));

    float themeGain = mix(0.62, 0.92, uDark);
    float lum = lightAlpha * themeGain;
    float totalAlpha = clamp((contactShadow + lum) * edgeMask, 0.0, 0.95);
    vec3 finalRgb = mix(shadowCol, glowCol, clamp(lum / max(0.001, contactShadow + lum), 0.0, 1.0));

    gl_FragColor = vec4(finalRgb, totalAlpha);
  }
`;

const cardStates = [];
let sharedGL = null;
let sharedUniforms = null;
let sharedScene = null;
let sharedCamera = null;
let rafId = 0;
let startTime = 0;
let lastFrameTime = 0;
let isPausedByUser = false;
let webglAvailable = true;
let reduceMotionQuery = null;

function readCssColor(propName, fallbackHex) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(propName).trim();
  const color = new THREE.Color();
  try {
    color.set(raw || fallbackHex);
  } catch {
    color.set(fallbackHex);
  }
  return color;
}

function syncShaderPalette() {
  if (!sharedUniforms) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  sharedUniforms.uDark.value = isDark ? 1.0 : 0.0;
  sharedUniforms.uColorA.value.copy(readCssColor('--holo-color-a', isDark ? '#74b4ff' : '#0f4c85'));
  sharedUniforms.uColorB.value.copy(readCssColor('--holo-color-b', isDark ? '#a8d2ff' : '#5a94c8'));
  sharedUniforms.uColorC.value.copy(readCssColor('--holo-color-c', isDark ? '#3b7dd8' : '#1e4b73'));
}

function initSharedRenderer() {
  if (sharedGL || !webglAvailable) return webglAvailable;

  try {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(1);
    renderer.setSize(HOLO_WIDTH, HOLO_HEIGHT, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uTilt: { value: new THREE.Vector2(0, 0) },
      uEnergy: { value: 0 },
      uDark: { value: 0 },
      uSeed: { value: 0 },
      uColorA: { value: new THREE.Color('#0f4c85') },
      uColorB: { value: new THREE.Color('#5a94c8') },
      uColorC: { value: new THREE.Color('#1e4b73') },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    sharedGL = renderer;
    sharedScene = scene;
    sharedCamera = camera;
    sharedUniforms = uniforms;
    syncShaderPalette();
    return true;
  } catch {
    webglAvailable = false;
    return false;
  }
}

function renderCardBase(card, elapsedSec) {
  if (!sharedGL || !sharedUniforms || !card.ctx2d) return;

  // Smoothly interpolate shader tilt & energy toward target values
  const lerpRate = card.isTilting ? 0.28 : 0.14;
  card.shaderTiltX += (card.targetTiltX - card.shaderTiltX) * lerpRate;
  card.shaderTiltY += (card.targetTiltY - card.shaderTiltY) * lerpRate;
  card.shaderEnergy += (card.targetEnergy - card.shaderEnergy) * lerpRate;

  sharedUniforms.uTime.value = elapsedSec;
  sharedUniforms.uTilt.value.set(card.shaderTiltX, card.shaderTiltY);
  sharedUniforms.uEnergy.value = card.shaderEnergy;
  sharedUniforms.uSeed.value = card.seed;

  sharedGL.render(sharedScene, sharedCamera);

  card.ctx2d.clearRect(0, 0, card.canvas.width, card.canvas.height);
  card.ctx2d.drawImage(sharedGL.domElement, 0, 0, card.canvas.width, card.canvas.height);
}

function renderStaticFrame() {
  if (!sharedGL) return;
  for (const card of cardStates) {
    if (card.slot.hidden) continue;
    card.shaderTiltX = 0;
    card.shaderTiltY = 0;
    card.shaderEnergy = 0;
    renderCardBase(card, 1.2);
  }
}

function isMotionDisabled() {
  return isPausedByUser || Boolean(reduceMotionQuery?.matches);
}

function stopLoop() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

function tick(now) {
  if (document.hidden || isMotionDisabled()) {
    rafId = 0;
    return;
  }

  let hasVisible = false;
  let hasActiveInteraction = false;

  for (const card of cardStates) {
    if (card.isVisible && !card.slot.hidden) {
      hasVisible = true;
      if (card.isTilting || card.shaderEnergy > 0.015 || Math.abs(card.shaderTiltX) > 0.01) {
        hasActiveInteraction = true;
      }
    }
  }

  if (!hasVisible) {
    rafId = 0;
    return;
  }

  // Throttle idle bases to ~30fps, ramp to full 60fps during active card tilt/spring
  const minInterval = hasActiveInteraction ? 15 : 32;
  if (now - lastFrameTime >= minInterval) {
    lastFrameTime = now;
    const elapsedSec = (now - startTime) * 0.001;
    for (const card of cardStates) {
      if (card.isVisible && !card.slot.hidden) {
        renderCardBase(card, elapsedSec);
      }
    }
  }

  rafId = requestAnimationFrame(tick);
}

function ensureLoopRunning() {
  if (!sharedGL || document.hidden || isMotionDisabled()) return;
  if (!rafId) {
    rafId = requestAnimationFrame(tick);
  }
}

function applyTiltNormalized(card, nx, ny, maxDeg = MAX_TILT_DEG, energy = 1.0) {
  const { stage } = card;
  const clampedX = Math.min(1, Math.max(-1, nx));
  const clampedY = Math.min(1, Math.max(-1, ny));
  const px = (clampedX + 1) * 0.5;
  const py = (clampedY + 1) * 0.5;

  // Pokémon-card feel: pressing top edge tilts top back (positive rotateX),
  // pressing right edge tilts right back (positive rotateY).
  const rotateX = (-clampedY * maxDeg).toFixed(2);
  const rotateY = (clampedX * maxDeg).toFixed(2);
  const shadowX = (-clampedX * 16).toFixed(1);
  const shadowY = (18 - clampedY * 10).toFixed(1);
  const holoAngle = (128 + clampedX * 24 - clampedY * 14).toFixed(1);

  stage.style.setProperty('--tilt-x', `${rotateX}deg`);
  stage.style.setProperty('--tilt-y', `${rotateY}deg`);
  stage.style.setProperty('--pointer-x', `${(px * 100).toFixed(1)}%`);
  stage.style.setProperty('--pointer-y', `${(py * 100).toFixed(1)}%`);
  stage.style.setProperty('--bg-x', `${(50 + clampedX * 35).toFixed(1)}%`);
  stage.style.setProperty('--bg-y', `${(50 + clampedY * 35).toFixed(1)}%`);
  stage.style.setProperty('--holo-angle', `${holoAngle}deg`);
  stage.style.setProperty('--shadow-x', `${shadowX}px`);
  stage.style.setProperty('--shadow-y', `${shadowY}px`);

  card.targetTiltX = clampedX;
  card.targetTiltY = clampedY;
  card.targetEnergy = energy;
}

function releaseCardTilt(card) {
  if (!card.isTilting) return;
  const { stage } = card;
  card.isTilting = false;
  card.tiltSource = null;

  stage.classList.remove('is-tilting');
  stage.classList.add('is-springing');
  stage.style.setProperty('--tilt-x', '0deg');
  stage.style.setProperty('--tilt-y', '0deg');
  stage.style.setProperty('--shadow-x', '0px');
  stage.style.setProperty('--shadow-y', '14px');

  card.targetTiltX = 0;
  card.targetTiltY = 0;
  card.targetEnergy = 0;

  window.clearTimeout(card.springCleanupTimer);
  card.springCleanupTimer = window.setTimeout(() => {
    stage.classList.remove('is-springing');
  }, 620);
}

function attachCardTilt(card) {
  const { stage } = card;
  stage.classList.add('is-holo-ready');

  // Prevent native browser image drag-and-drop from hijacking click-and-hold tilt
  stage.querySelectorAll('img').forEach((img) => {
    img.draggable = false;
  });
  stage.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

  let activePointerId = null;
  let activeTouchId = null;

  function applyTiltFromCoords(clientX, clientY, maxDeg = MAX_TILT_DEG) {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    applyTiltNormalized(card, px * 2 - 1, py * 2 - 1, maxDeg, 1.0);
  }

  function releaseTilt() {
    activePointerId = null;
    activeTouchId = null;
    releaseCardTilt(card);
  }

  // Desktop / fine-pointer: click-and-hold mouse tilt
  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if (reduceMotionQuery?.matches) return;
    if (event.target.closest(INTERACTIVE_SELECTOR)) return;

    // Prevent native image drag or text selection from cancelling pointer capture
    event.preventDefault();

    window.clearTimeout(card.springCleanupTimer);
    card.isTilting = true;
    card.tiltSource = 'mouse';
    activePointerId = event.pointerId;

    stage.classList.remove('is-springing');
    stage.classList.add('is-tilting');

    try {
      stage.setPointerCapture(event.pointerId);
    } catch {
      /* ignore if capture unsupported */
    }

    applyTiltFromCoords(event.clientX, event.clientY, MAX_TILT_DEG);
    ensureLoopRunning();
  });

  stage.addEventListener('pointermove', (event) => {
    if (!card.isTilting || card.tiltSource !== 'mouse' || event.pointerId !== activePointerId) return;
    applyTiltFromCoords(event.clientX, event.clientY, MAX_TILT_DEG);
  });

  stage.addEventListener('pointerup', (event) => {
    if (card.tiltSource !== 'mouse' || event.pointerId !== activePointerId) return;
    releaseTilt();
  });

  stage.addEventListener('pointercancel', (event) => {
    if (card.tiltSource !== 'mouse' || event.pointerId !== activePointerId) return;
    releaseTilt();
  });

  stage.addEventListener('lostpointercapture', () => {
    if (card.tiltSource === 'mouse') releaseTilt();
  });

  // Mobile / touch: passive touch listeners tilt ONLY the pressed card while scrolling natively
  let touchRaf = 0;
  let pendingTouchX = 0;
  let pendingTouchY = 0;

  stage.addEventListener('touchstart', (event) => {
    if (reduceMotionQuery?.matches || isPausedByUser) return;
    if (event.touches.length !== 1) return;
    if (event.target.closest(INTERACTIVE_SELECTOR)) return;

    const touch = event.touches[0];
    window.clearTimeout(card.springCleanupTimer);
    card.isTilting = true;
    card.tiltSource = 'touch';
    activeTouchId = touch.identifier;
    pendingTouchX = touch.clientX;
    pendingTouchY = touch.clientY;

    stage.classList.remove('is-springing');
    stage.classList.add('is-tilting');

    applyTiltFromCoords(pendingTouchX, pendingTouchY, 10);
    ensureLoopRunning();
  }, { passive: true });

  stage.addEventListener('touchmove', (event) => {
    if (!card.isTilting || card.tiltSource !== 'touch') return;
    const touch = [...event.touches].find((t) => t.identifier === activeTouchId) || event.touches[0];
    if (!touch) return;
    pendingTouchX = touch.clientX;
    pendingTouchY = touch.clientY;
    if (!touchRaf) {
      touchRaf = requestAnimationFrame(() => {
        touchRaf = 0;
        if (card.isTilting && card.tiltSource === 'touch') {
          applyTiltFromCoords(pendingTouchX, pendingTouchY, 10);
        }
      });
    }
  }, { passive: true });

  const endTouchTilt = (event) => {
    if (card.tiltSource !== 'touch') return;
    const stillActive = [...event.touches].some((t) => t.identifier === activeTouchId);
    if (!stillActive) {
      if (touchRaf) {
        cancelAnimationFrame(touchRaf);
        touchRaf = 0;
      }
      releaseTilt();
    }
  };

  stage.addEventListener('touchend', endTouchTilt, { passive: true });
  stage.addEventListener('touchcancel', endTouchTilt, { passive: true });
}

export function initHoloCards() {
  const slots = [...document.querySelectorAll('#work-target > .stage-slot')];
  if (!slots.length) return;

  reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  startTime = performance.now();

  const hasWebGL = initSharedRenderer();

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const card = cardStates.find((c) => c.slot === entry.target);
          if (card) card.isVisible = entry.isIntersecting;
        }
        ensureLoopRunning();
      },
      { rootMargin: '80px 0px', threshold: 0.01 },
    )
    : null;

  slots.forEach((slot, index) => {
    const stage = slot.querySelector(':scope > .stage');
    if (!stage) return;

    // Stagger gentle levitation so neighboring cards float organically
    stage.style.setProperty('--holo-float-delay', `${(-index * 0.95).toFixed(2)}s`);

    // Inject prismatic foil overlay inside .stage (hidden until click-and-hold)
    let foil = stage.querySelector(':scope > .stage-holo-foil');
    if (!foil) {
      foil = document.createElement('div');
      foil.className = 'stage-holo-foil';
      foil.setAttribute('aria-hidden', 'true');
      stage.appendChild(foil);
    }

    // Inject hologram emitter pedestal directly beneath .stage inside .stage-slot
    let base = slot.querySelector(':scope > .holo-base');
    if (!base) {
      base = document.createElement('div');
      base.className = 'holo-base';
      base.setAttribute('aria-hidden', 'true');
      slot.appendChild(base);
    }

    let canvas = null;
    let ctx2d = null;
    if (hasWebGL) {
      canvas = document.createElement('canvas');
      canvas.className = 'holo-base-canvas';
      canvas.width = HOLO_WIDTH;
      canvas.height = HOLO_HEIGHT;
      base.appendChild(canvas);
      ctx2d = canvas.getContext('2d');
    } else {
      base.classList.add('is-fallback');
    }

    const card = {
      slot,
      stage,
      base,
      canvas,
      ctx2d,
      seed: (index + 1) * 0.23,
      isVisible: true,
      isTilting: false,
      tiltSource: null,
      springCleanupTimer: 0,
      targetTiltX: 0,
      targetTiltY: 0,
      targetEnergy: 0,
      shaderTiltX: 0,
      shaderTiltY: 0,
      shaderEnergy: 0,
    };

    cardStates.push(card);
    attachCardTilt(card);
    observer?.observe(slot);
  });

  if (hasWebGL) {
    renderStaticFrame();
    if (!isMotionDisabled()) {
      ensureLoopRunning();
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop();
    else ensureLoopRunning();
  });

  reduceMotionQuery.addEventListener('change', () => {
    if (isMotionDisabled()) {
      stopLoop();
      renderStaticFrame();
    } else {
      ensureLoopRunning();
    }
  });
}

export function refreshHoloThemes() {
  syncShaderPalette();
  if (isMotionDisabled()) {
    renderStaticFrame();
  }
}

export function setHoloPaused(paused) {
  isPausedByUser = Boolean(paused);
  if (isPausedByUser) {
    stopLoop();
    renderStaticFrame();
  } else {
    ensureLoopRunning();
  }
}
