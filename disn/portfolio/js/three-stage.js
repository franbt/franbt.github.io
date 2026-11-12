/**
 * ==========================================================================
 * MODULAR THREE.JS CONTAINER MANAGER (three-stage.js)
 * Automatically mounts/unmounts WebGL scenes in `[data-three-scene]` containers,
 * adapts FOV & framing to any vertical/horizontal aspect ratio via ResizeObserver,
 * and cleans up GPU resources across HTMX partial swaps.
 * ==========================================================================
 */

import * as THREE from 'three';

const activeStages = new Map();

/**
 * Compute adaptive vertical FOV so 3D subjects remain completely framed
 * whether the container is 21:9 horizontal or 9:16 vertical.
 */
function computeAdaptiveFov(baseFovDeg, aspect) {
  if (aspect >= 1) {
    return baseFovDeg;
  }
  const baseRad = THREE.MathUtils.degToRad(baseFovDeg);
  const adjustedRad = 2 * Math.atan(Math.tan(baseRad / 2) / Math.max(aspect, 0.42));
  return THREE.MathUtils.clamp(THREE.MathUtils.radToDeg(adjustedRad), baseFovDeg, 82);
}

/**
 * Read current theme colors for Three.js scenes
 */
function getThemePalette() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return isLight
    ? {
        bg: 0xe6e4dd,
        grid: 0xc5c2b8,
        primary: 0x0284c7,
        secondary: 0x1e293b,
        accent: 0x4f46e5,
      }
    : {
        bg: 0x07080b,
        grid: 0x1e2330,
        primary: 0x38bdf8,
        secondary: 0x94a3b8,
        accent: 0x818cf8,
      };
}

/**
 * Procedural Scene Builders
 * Each returns { group, update(elapsed, pointer), setWireframe(bool), applyPalette(palette) }
 */
const SCENE_BUILDERS = {
  /**
   * 1. HERO LATTICE: Architectural geodesic core + orbital rings + spatial grid
   */
  'hero-lattice': (palette) => {
    const group = new THREE.Group();

    const coreGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      metalness: 0.35,
      roughness: 0.25,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.82, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: palette.secondary,
      metalness: 0.65,
      roughness: 0.2,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    const ringGeo = new THREE.TorusGeometry(2.05, 0.018, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: palette.accent });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.6;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo.clone(), ringMat);
    ring2.rotation.y = Math.PI / 3;
    ring2.scale.setScalar(0.84);
    group.add(ring2);

    return {
      group,
      update(t, pointer, autoRotate) {
        if (autoRotate) {
          coreMesh.rotation.y = t * 0.28;
          coreMesh.rotation.x = Math.sin(t * 0.4) * 0.25;
          innerMesh.rotation.y = -t * 0.5;
          innerMesh.rotation.z = t * 0.3;
          ring1.rotation.z = t * 0.2;
          ring2.rotation.x = -t * 0.25;
        }
        group.rotation.y += (pointer.x * 0.65 - group.rotation.y) * 0.06;
        group.rotation.x += (-pointer.y * 0.45 - group.rotation.x) * 0.06;
      },
      setWireframe(enabled) {
        innerMat.wireframe = enabled;
        coreMat.wireframe = true;
      },
      applyPalette(p) {
        coreMat.color.setHex(p.primary);
        innerMat.color.setHex(p.secondary);
        ringMat.color.setHex(p.accent);
      },
    };
  },

  /**
   * 2. TORUS KNOT: Parametric shader-like faceted surface for 3D product/shader demo
   */
  'torus-knot': (palette) => {
    const group = new THREE.Group();
    const geo = new THREE.TorusKnotGeometry(1.05, 0.32, 140, 24, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      metalness: 0.55,
      roughness: 0.22,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    const cageGeo = new THREE.BoxGeometry(2.9, 2.9, 2.9);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({ color: palette.secondary, transparent: true, opacity: 0.4 });
    const cage = new THREE.LineSegments(cageEdges, cageMat);
    group.add(cage);

    return {
      group,
      update(t, pointer, autoRotate) {
        if (autoRotate) {
          mesh.rotation.y = t * 0.45;
          mesh.rotation.x = t * 0.25;
          cage.rotation.y = -t * 0.12;
        }
        group.rotation.y += (pointer.x * 0.7 - group.rotation.y) * 0.06;
        group.rotation.x += (-pointer.y * 0.5 - group.rotation.x) * 0.06;
      },
      setWireframe(enabled) {
        mat.wireframe = enabled;
      },
      applyPalette(p) {
        mat.color.setHex(p.primary);
        cageMat.color.setHex(p.secondary);
      },
    };
  },

  /**
   * 3. VOXEL WAVE: Kinetic architectural matrix of instanced columns
   */
  'voxel-wave': (palette) => {
    const group = new THREE.Group();
    const gridCount = 7;
    const spacing = 0.42;
    const boxGeo = new THREE.BoxGeometry(0.28, 1.0, 0.28);
    const boxMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      metalness: 0.4,
      roughness: 0.3,
    });

    const bars = [];
    const offset = ((gridCount - 1) * spacing) / 2;

    for (let x = 0; x < gridCount; x++) {
      for (let z = 0; z < gridCount; z++) {
        const bar = new THREE.Mesh(boxGeo, boxMat);
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
          const scaleY = 0.35 + Math.sin(t * 2.2 - dist * 0.85) * 0.65 + 0.5;
          item.mesh.scale.y = Math.max(0.15, scaleY);
        }
        if (autoRotate) {
          group.rotation.y = t * 0.25 + pointer.x * 0.5;
        } else {
          group.rotation.y += (pointer.x * 0.6 - group.rotation.y) * 0.06;
        }
      },
      setWireframe(enabled) {
        boxMat.wireframe = enabled;
      },
      applyPalette(p) {
        boxMat.color.setHex(p.primary);
      },
    };
  },

  /**
   * 4. ORBITAL TOWER: Vertical-friendly kinetic sculpture ideal for 9:16 & 4:5 portrait ratios
   */
  'orbital-tower': (palette) => {
    const group = new THREE.Group();
    const ringMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      metalness: 0.5,
      roughness: 0.25,
      wireframe: false,
    });

    const tiers = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const radius = 0.55 + Math.sin((i / (count - 1)) * Math.PI) * 0.65;
      const geo = new THREE.CylinderGeometry(radius, radius, 0.14, 6);
      const slice = new THREE.Mesh(geo, ringMat);
      slice.position.y = (i - (count - 1) / 2) * 0.42;
      group.add(slice);
      tiers.push({ mesh: slice, index: i });
    }

    const spineGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.4, 16);
    const spineMat = new THREE.MeshBasicMaterial({ color: palette.accent, wireframe: true });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    group.add(spine);

    return {
      group,
      update(t, pointer, autoRotate) {
        for (const tier of tiers) {
          tier.mesh.rotation.y = (autoRotate ? t * 0.6 : 0) + tier.index * 0.35 + pointer.x * 0.8;
          tier.mesh.position.x = Math.sin(t * 1.5 + tier.index * 0.6) * 0.12;
        }
        group.rotation.x += (-pointer.y * 0.35 - group.rotation.x) * 0.06;
      },
      setWireframe(enabled) {
        ringMat.wireframe = enabled;
      },
      applyPalette(p) {
        ringMat.color.setHex(p.primary);
        spineMat.color.setHex(p.accent);
      },
    };
  },
};

/**
 * Mount a Three.js stage inside a container element
 */
export function mountThreeContainer(container) {
  if (!container || activeStages.has(container)) return;

  const sceneType = container.getAttribute('data-three-scene') || 'hero-lattice';
  const builder = SCENE_BUILDERS[sceneType] || SCENE_BUILDERS['hero-lattice'];
  const palette = getThemePalette();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(palette.bg);

  const gridHelper = new THREE.GridHelper(12, 24, palette.grid, palette.grid);
  gridHelper.position.y = -2.1;
  scene.add(gridHelper);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.4, 5.4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.prepend(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
  dirLight1.position.set(4, 6, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(palette.accent, 0.9);
  dirLight2.position.set(-5, -3, 2);
  scene.add(dirLight2);

  const subject = builder(palette);
  scene.add(subject.group);

  const state = {
    container,
    scene,
    camera,
    renderer,
    gridHelper,
    subject,
    pointer: { x: 0, y: 0 },
    autoRotate: true,
    wireframe: sceneType === 'hero-lattice',
    rafId: null,
    startTime: performance.now(),
    isVisible: true,
  };

  /* Pointer interaction */
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

  /* HUD buttons inside container */
  const onHudClick = (e) => {
    const btn = e.target.closest('[data-three-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-three-action');
    if (action === 'wireframe') {
      state.wireframe = !state.wireframe;
      subject.setWireframe(state.wireframe);
      btn.setAttribute('aria-pressed', String(state.wireframe));
    } else if (action === 'autorotate') {
      state.autoRotate = !state.autoRotate;
      btn.setAttribute('aria-pressed', String(state.autoRotate));
    } else if (action === 'reset') {
      state.pointer.x = 0;
      state.pointer.y = 0;
      subject.group.rotation.set(0, 0, 0);
    }
  };
  container.addEventListener('click', onHudClick);

  /* ResizeObserver for instant adaptation to any horizontal/vertical aspect ratio */
  const updateSize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const aspect = width / height;

    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.fov = computeAdaptiveFov(42, aspect);
    camera.updateProjectionMatrix();

    const resBadge = container.querySelector('[data-hud-res]');
    if (resBadge) {
      resBadge.textContent = `${width}×${height}px`;
    }
    const aspectBadge = container.querySelector('[data-hud-aspect]');
    if (aspectBadge) {
      const parentAspect =
        container.closest('[data-aspect]')?.getAttribute('data-aspect') ||
        (aspect > 1.15 ? 'HORIZONTAL' : aspect < 0.85 ? 'VERTICAL' : '1:1');
      aspectBadge.textContent = `${parentAspect} (${aspect.toFixed(2)})`;
    }
  };

  const resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(container);
  updateSize();

  /* IntersectionObserver to pause rendering when scrolled off-screen */
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        state.isVisible = entry.isIntersecting;
      }
    },
    { threshold: 0.02 }
  );
  intersectionObserver.observe(container);

  /* Render Loop */
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
    container.removeEventListener('click', onHudClick);
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

/**
 * Scan a root DOM node and mount all `[data-three-scene]` containers
 */
export function initAllThreeContainers(root = document) {
  const containers = root.querySelectorAll('[data-three-scene]');
  containers.forEach((c) => mountThreeContainer(c));
}

/**
 * Dispose Three.js stages inside a subtree before HTMX removes it
 */
export function cleanupThreeContainersIn(root) {
  if (!root || !root.querySelectorAll) return;
  if (activeStages.has(root)) {
    activeStages.get(root).cleanup();
    activeStages.delete(root);
  }
  const containers = root.querySelectorAll('[data-three-scene]');
  containers.forEach((c) => {
    if (activeStages.has(c)) {
      activeStages.get(c).cleanup();
      activeStages.delete(c);
    }
  });
}

/**
 * Refresh theme colors across all active Three.js stages
 */
export function refreshThreeThemes() {
  const palette = getThemePalette();
  activeStages.forEach((state) => {
    state.scene.background.setHex(palette.bg);
    state.gridHelper.material.color.setHex(palette.grid);
    state.subject.applyPalette(palette);
  });
}
