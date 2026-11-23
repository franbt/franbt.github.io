/**
 * ==========================================================================
 * DIAPHANOUS THREE.JS STAGE ENGINE (three-stage.js)
 * Clean, weightless WebGL viewports. Adapts silently to any vertical
 * or horizontal aspect ratio under the hood.
 * ==========================================================================
 */

import * as THREE from 'three';

const activeStages = new Map();

/**
 * Adaptive vertical FOV:
 * Expands vertical FOV on portrait containers (< 1.0) so subjects remain
 * cleanly framed without cropping.
 */
function computeAdaptiveFov(baseFovDeg, aspect) {
  if (aspect >= 1) return baseFovDeg;
  const baseRad = THREE.MathUtils.degToRad(baseFovDeg);
  const adjustedRad = 2 * Math.atan(Math.tan(baseRad / 2) / Math.max(aspect, 0.44));
  return THREE.MathUtils.clamp(THREE.MathUtils.radToDeg(adjustedRad), baseFovDeg, 80);
}

const MINERAL_PALETTE = {
  light: { bg: 0x9bb2c8, primary: 0x06121f, secondary: 0x3f5469, accent: 0x135999 },
  dark:  { bg: 0x151e2a, primary: 0xf1f6fb, secondary: 0x8ea3b8, accent: 0x60a5fa },
};

function getThemePalette() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return MINERAL_PALETTE[isDark ? 'dark' : 'light'];
}

const SCENE_BUILDERS = {
  'hero-lattice': (palette) => {
    const group = new THREE.Group();

    const outerGeo = new THREE.IcosahedronGeometry(1.38, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.74, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: palette.secondary,
      roughness: 0.45,
      metalness: 0.15,
      flatShading: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    const ringGeo = new THREE.TorusGeometry(2.05, 0.008, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: palette.accent,
      transparent: true,
      opacity: 0.55,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.8;
    group.add(ring);

    return {
      group,
      update(t, pointer, autoRotate) {
        if (autoRotate) {
          outerMesh.rotation.y = t * 0.16;
          outerMesh.rotation.x = Math.sin(t * 0.25) * 0.18;
          innerMesh.rotation.y = -t * 0.28;
          ring.rotation.z = t * 0.12;
        }
        group.rotation.y += (pointer.x * 0.45 - group.rotation.y) * 0.045;
        group.rotation.x += (-pointer.y * 0.3 - group.rotation.x) * 0.045;
      },
      setWireframe(enabled) {
        innerMat.wireframe = enabled;
      },
      applyPalette(p) {
        outerMat.color.setHex(p.primary);
        innerMat.color.setHex(p.secondary);
        ringMat.color.setHex(p.accent);
      },
    };
  },

  'torus-knot': (palette) => {
    const group = new THREE.Group();
    const geo = new THREE.TorusKnotGeometry(1.02, 0.26, 128, 24, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      roughness: 0.35,
      metalness: 0.25,
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    return {
      group,
      update(t, pointer, autoRotate) {
        if (autoRotate) {
          mesh.rotation.y = t * 0.28;
          mesh.rotation.x = t * 0.16;
        }
        group.rotation.y += (pointer.x * 0.55 - group.rotation.y) * 0.045;
        group.rotation.x += (-pointer.y * 0.35 - group.rotation.x) * 0.045;
      },
      setWireframe(enabled) {
        mat.wireframe = enabled;
      },
      applyPalette(p) {
        mat.color.setHex(p.primary);
      },
    };
  },

  'voxel-wave': (palette) => {
    const group = new THREE.Group();
    const count = 7;
    const spacing = 0.42;
    const geo = new THREE.BoxGeometry(0.22, 1.0, 0.22);
    const mat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      roughness: 0.4,
      metalness: 0.15,
    });

    const bars = [];
    const offset = ((count - 1) * spacing) / 2;

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const bar = new THREE.Mesh(geo, mat);
        bar.position.set(x * spacing - offset, 0, z * spacing - offset);
        group.add(bar);
        bars.push({ mesh: bar, gx: x, gz: z });
      }
    }
    group.rotation.x = 0.45;

    return {
      group,
      update(t, pointer, autoRotate) {
        for (const item of bars) {
          const dist = Math.hypot(item.gx - 3, item.gz - 3);
          const s = 0.3 + Math.sin(t * 1.8 - dist * 0.75) * 0.55 + 0.4;
          item.mesh.scale.y = Math.max(0.12, s);
        }
        if (autoRotate) {
          group.rotation.y = t * 0.16 + pointer.x * 0.35;
        } else {
          group.rotation.y += (pointer.x * 0.45 - group.rotation.y) * 0.045;
        }
      },
      setWireframe(enabled) {
        mat.wireframe = enabled;
      },
      applyPalette(p) {
        mat.color.setHex(p.primary);
      },
    };
  },

  'orbital-tower': (palette) => {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      roughness: 0.35,
      metalness: 0.2,
    });

    const tiers = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const radius = 0.48 + Math.sin((i / (count - 1)) * Math.PI) * 0.52;
      const geo = new THREE.CylinderGeometry(radius, radius, 0.11, 6);
      const slice = new THREE.Mesh(geo, mat);
      slice.position.y = (i - (count - 1) / 2) * 0.42;
      group.add(slice);
      tiers.push({ mesh: slice, index: i });
    }

    const spineGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.3, 8);
    const spineMat = new THREE.MeshBasicMaterial({ color: palette.accent });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    group.add(spine);

    return {
      group,
      update(t, pointer, autoRotate) {
        for (const tier of tiers) {
          tier.mesh.rotation.y = (autoRotate ? t * 0.4 : 0) + tier.index * 0.3 + pointer.x * 0.65;
          tier.mesh.position.x = Math.sin(t * 1.3 + tier.index * 0.6) * 0.08;
        }
        group.rotation.x += (-pointer.y * 0.28 - group.rotation.x) * 0.045;
      },
      setWireframe(enabled) {
        mat.wireframe = enabled;
      },
      applyPalette(p) {
        mat.color.setHex(p.primary);
        spineMat.color.setHex(p.accent);
      },
    };
  },
};

export function mountThreeContainer(container) {
  if (!container || activeStages.has(container)) return;

  const sceneType = container.getAttribute('data-three-scene') || 'hero-lattice';
  const builder = SCENE_BUILDERS[sceneType] || SCENE_BUILDERS['hero-lattice'];
  const palette = getThemePalette();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(palette.bg);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.25, 5.2);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.prepend(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.25);
  dirLight1.position.set(4, 6, 4);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.45);
  dirLight2.position.set(-4, -3, 2);
  scene.add(dirLight2);

  const subject = builder(palette);
  scene.add(subject.group);

  const state = {
    container,
    scene,
    camera,
    renderer,
    subject,
    pointer: { x: 0, y: 0 },
    autoRotate: true,
    wireframe: false,
    rafId: null,
    startTime: performance.now(),
    isVisible: true,
  };

  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    state.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    state.pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  const onPointerLeave = () => {
    state.pointer.x = 0;
    state.pointer.y = 0;
  };

  container.addEventListener('pointermove', onPointerMove, { passive: true });
  container.addEventListener('pointerleave', onPointerLeave, { passive: true });

  const updateSize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const aspect = width / height;

    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.fov = computeAdaptiveFov(38, aspect);
    camera.updateProjectionMatrix();
  };

  const resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(container);
  updateSize();

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        state.isVisible = entry.isIntersecting;
      }
    },
    { threshold: 0.01 }
  );
  intersectionObserver.observe(container);

  const animate = (now) => {
    state.rafId = requestAnimationFrame(animate);
    if (!state.isVisible) return;
    const elapsed = (now - state.startTime) * 0.001;
    subject.update(elapsed, state.pointer, state.autoRotate);
    renderer.render(scene, camera);
  };
  state.rafId = requestAnimationFrame(animate);

  state.cleanup = () => {
    if (state.rafId) cancelAnimationFrame(state.rafId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerleave', onPointerLeave);
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  };

  activeStages.set(container, state);
}

export function initAllThreeContainers(root = document) {
  root.querySelectorAll('[data-three-scene]').forEach((c) => mountThreeContainer(c));
}

export function cleanupThreeContainersIn(root) {
  if (!root || !root.querySelectorAll) return;
  if (activeStages.has(root)) {
    activeStages.get(root).cleanup();
    activeStages.delete(root);
  }
  root.querySelectorAll('[data-three-scene]').forEach((c) => {
    if (activeStages.has(c)) {
      activeStages.get(c).cleanup();
      activeStages.delete(c);
    }
  });
}

export function refreshThreeThemes() {
  const palette = getThemePalette();
  activeStages.forEach((state) => {
    state.scene.background.setHex(palette.bg);
    state.subject.applyPalette(palette);
  });
}
