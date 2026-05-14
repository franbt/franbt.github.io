import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

let scene, camera, renderer, controls;

// Flight Animation State
let isAnimating = false;
let animStartTime = 0;
let animDuration = 1500; // ms
let startCamPos = new THREE.Vector3();
let startTarget = new THREE.Vector3();
let startZoom = 1;
let endCamPos = new THREE.Vector3();
let endTarget = new THREE.Vector3();
let endZoom = 1;

let initialCamPos = new THREE.Vector3();
let initialTarget = new THREE.Vector3();
let initialZoom = 1;
let initialNear = 0.1;
let initialFar = 50000;

const landmarks = [
    { name: "Charca del Marco", apunt: "Origen del caudal de la Rivera del Marco", desc: "También llamada 'Fuente del Rey', procede de la filtración de agua del Calerizo y llega a través de un sifón natural. Sus aguas transcurren de sureste a noreste por la Ribera.", titu: "Municipal", type: "Acuífero", target: { x: 558, y: 0, z: 1654 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Fría", apunt: "Fuente Municipal", desc: "La Fuente Fría se encuentra en el Centro-Casco Antiguo de Cáceres, situada específicamente detrás del antiguo monasterio de San Francisco.  Es un punto de interés turístico y patrimonial destacado por la excelente calidad de sus aguas.Los vecinos de Cáceres siguen acudiendo a ella para abastecerse de agua.", titu: "Municipal", type: "Fuente", target: { x: 329, y: 30, z: 202 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Concejo", apunt: "Fuente Municipal", desc: "La Fuente Concejo es considerada la fuente más importante de la ciudad de Cáceres.  Fue ordenada construir por D. Alfonso Golfín a finales del siglo XV y destaca por un escudo real labrado en piedra, datado en el reinado de Juan II. La estructura cuenta con un depósito cubierto por una bóveda sostenida por seis arcos que dan hacia la Ribera del Marco, una explanada que históricamente servía como lugar de reunión.  Para acceder a ella desde la Ciudad Monumental, la puerta más cercana es el Arco del Cristo.", titu: "Municipal", type: "Fuente", target: { x: 219, y: 20, z: -221 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Rocha", apunt: "Fuente Municipal", desc: "Fuente Rocha es un monumento de estilo neomudéjar situado en el casco antiguo de Cáceres, específicamente en la Calle Concordia.  Aunque su caudal nunca fue abundante, esta fuente tuvo gran importancia histórica al abastecer a los vecinos de la Barriada de San Marquino hasta la década de 1950.", titu: "Municipal", type: "Fuente", target: { x: 378, y: 20, z: -459 }, offset: { x: 0, y: 0, z: 0 }, zoom: 5 },
    { name: "Fuente Aguas Vivas", apunt: "Origen del caudal de la Rivera del Marco", desc: "También llamada 'Fuente del Rey', procede de la filtración de agua del Calerizo y llega a través de un sifón natural. Sus aguas transcurren de sureste a noreste por la Ribera.", titu: "Municipal", type: "Acuífero", target: { x: 616, y: 0, z: 861 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
];

let initialFrustumHeight = 1000;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const terrainObjects = [];
// Add this near the top with other global variables (around line 36):
const markers = [];
const markerLabels = [];

function init() {
    const container = document.getElementById('canvas-container');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50000);
    camera.position.set(100000, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = 0.1; // Prevent looking completely straight down (which causes a 180° zenith flip)
    controls.maxPolarAngle = 1.2; // Restrict vertical tilt so you don't see past the terrain edge into the void
    controls.minDistance = 5;
    controls.maxDistance = 5000;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    // Lat: 39.4765 N configures the sun's elevation. At mid-afternoon, the sun is roughly South-West.
    // Setting up a mathematically accurate Spherical proxy for those coordinates to cast authentic shadows:
    // x = West (-), y = Altitude (+), z = South (+)
    dirLight.position.set(-2269, 3535, 2708);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 5000;
    dirLight.shadow.camera.bottom = -5000;
    dirLight.shadow.camera.left = -5000;
    dirLight.shadow.camera.right = 5000;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 20000;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    scene.add(dirLight);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    const loadingElem = document.getElementById('loading');

    loader.load(
        'Caceres_mapa.glb',
        function (gltf) {
            const model = gltf.scene;

            let cam = null;
            if (gltf.cameras && gltf.cameras.length > 0) {
                cam = gltf.cameras[0];
                // Update matrix world to ensure we have the correct world position/quaternion
                gltf.scene.updateMatrixWorld(true);
            } else {
                cam = gltf.scene.getObjectByName("Camera");
            }

            if (cam) {
                if (cam.isOrthographicCamera) {
                    camera.left = cam.left; camera.right = cam.right;
                    camera.top = cam.top; camera.bottom = cam.bottom;
                    initialFrustumHeight = cam.top - cam.bottom;
                } else {
                    initialFrustumHeight = 2000;
                }

                const worldPos = new THREE.Vector3();
                const worldQuat = new THREE.Quaternion();
                cam.getWorldPosition(worldPos);
                cam.getWorldQuaternion(worldQuat);

                camera.position.copy(worldPos);
                camera.quaternion.copy(worldQuat);
                camera.near = cam.near || 0.1;
                camera.far = cam.far || 50000;
                camera.updateProjectionMatrix();

                // Compute controls target by looking forward from the camera
                const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(worldQuat);
                let distance = 2000;
                if (forward.y < -0.001) {
                    distance = -worldPos.y / forward.y; // intersect with ground plane (y=0)
                }
                controls.target.copy(worldPos).add(forward.multiplyScalar(distance));
                controls.update();
            } else {
                initialFrustumHeight = 2000; // default if no camera in GLTF
            }

            initialNear = camera.near;
            initialFar = camera.far;

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.roughness = 0.9;
                        child.material.metalness = 0.0;
                    }
                    terrainObjects.push(child);
                }
            });

            scene.add(model);

            // Ensure aspect ratio is correct for the current window
            onWindowResize();

            // Save initial view
            initialCamPos.copy(camera.position);
            initialTarget.copy(controls.target);
            initialZoom = camera.zoom;
            // Call createLandmarkMarkers() in the model loading callback (after setupUI()):
            // Around line 132, add this:
            createLandmarkMarkers();
            setupUI();

            loadingElem.style.opacity = '0';
            setTimeout(() => loadingElem.style.display = 'none', 500);
        },
        function (xhr) {
            if (xhr.total > 0) {
                loadingElem.innerText = `Loading terrain... ${Math.round(xhr.loaded / xhr.total * 100)}%`;
            } else {
                loadingElem.innerText = `Loading terrain... ${(xhr.loaded / 1024 / 1024).toFixed(2)} MB`;
            }
        },
        function (error) {
            console.error('An error happened', error);
            loadingElem.innerText = 'Error loading model. Check console.';
            loadingElem.style.background = 'rgba(255, 0, 0, 0.7)';
        }
    );

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    animate();
}

function onMouseMove(event) {
    // UI Elements
    const crossX = document.getElementById('crosshair-x');
    const crossY = document.getElementById('crosshair-y');
    const tooltip = document.getElementById('coords-tooltip');
    const coordX = document.getElementById('coord-x');
    const coordY = document.getElementById('coord-y');

    // Update Crosshair Position
    crossX.style.top = event.clientY + 'px';
    crossY.style.left = event.clientX + 'px';

    // Calculate Mouse Raycasting
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(terrainObjects);

    if (intersects.length > 0) {
        const point = intersects[0].point;

        // Show Tooltip & Update Values
        tooltip.style.opacity = '1';
        tooltip.style.left = (event.clientX + 20) + 'px';
        tooltip.style.top = (event.clientY + 20) + 'px';

        coordX.innerText = point.x.toFixed(2);
        coordY.innerText = point.z.toFixed(2); // Using Z for the second map coordinate
    } else {
        tooltip.style.opacity = '0';
    }
}


function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    // Improved resize logic:
    // If landscape (aspect > 1), keep vertical height constant.
    // If portrait (aspect < 1), keep horizontal width constant to avoid "too narrow" feeling.
    if (aspect > 1) {
        camera.left = -initialFrustumHeight * aspect / 2;
        camera.right = initialFrustumHeight * aspect / 2;
        camera.top = initialFrustumHeight / 2;
        camera.bottom = -initialFrustumHeight / 2;
    } else {
        camera.left = -initialFrustumHeight / 2;
        camera.right = initialFrustumHeight / 2;
        camera.top = (initialFrustumHeight / aspect) / 2;
        camera.bottom = -(initialFrustumHeight / aspect) / 2;
    }

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



function animate(time) {
    requestAnimationFrame(animate);

    if (isAnimating) {
        let alpha = (time - animStartTime) / animDuration;
        if (alpha >= 1) {
            alpha = 1;
            isAnimating = false;
            controls.enabled = true; // give back control
        }

        // Two-phase cinematic macro sequence: 
        // 1. Move position overhead mostly during 0.0 - 0.7
        // 2. Zoom the lens mostly during 0.3 - 1.0 (getting closer as a macro detail)

        let moveAlpha = Math.min(Math.max(alpha / 0.7, 0), 1);
        let zoomAlpha = Math.min(Math.max((alpha - 0.3) / 0.7, 0), 1);

        // Smoothstep both
        const smoothMove = moveAlpha * moveAlpha * (3 - 2 * moveAlpha);
        const smoothZoom = zoomAlpha * zoomAlpha * (3 - 2 * zoomAlpha);

        camera.position.lerpVectors(startCamPos, endCamPos, smoothMove);
        controls.target.lerpVectors(startTarget, endTarget, smoothMove);
        camera.zoom = THREE.MathUtils.lerp(startZoom, endZoom, smoothZoom);
        camera.updateProjectionMatrix();
    }

    // Extend frustum vastly and dynamically inverse-proportionally to prevent physical clipping in macro mode
    let zoomRatio = camera.zoom / (initialZoom || 1);
    camera.near = -100000; // An orthographic camera can use massive negative near planes to prevent slicing anything behind the camera plane!
    camera.far = 100000 / zoomRatio; // scale far relative to zoom without shrinking it into the model
    camera.updateProjectionMatrix();

    // Update controls first to compute new camera position
    controls.update();

    // Ensure camera world matrix is updated before projecting 3D coordinates to 2D screen space
    camera.updateMatrixWorld();

    // Now update marker labels using the correct current-frame camera matrix
    updateMarkerLabels();

    renderer.render(scene, camera);
}

// Add this new function before setupUI() (around line 254):
function createLandmarkMarkers() {
    landmarks.forEach((landmark, index) => {
        // Find correct Y elevation using a raycaster to prevent parallax sliding
        const origin = new THREE.Vector3(landmark.target.x, 10000, landmark.target.z);
        const direction = new THREE.Vector3(0, -1, 0);
        const verticalRaycaster = new THREE.Raycaster(origin, direction);
        const intersects = verticalRaycaster.intersectObjects(terrainObjects, true);

        let surfaceY = landmark.target.y;
        if (intersects.length > 0) {
            surfaceY = intersects[0].point.y;
        }

        // Create a billboarding Sprite so it rotates over its origin facing the camera
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(32, 32, 24, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6b35';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, color: 0xffffff, depthTest: false });

        const markerSprite = new THREE.Sprite(spriteMaterial);
        markerSprite.scale.set(24, 24, 1);
        markerSprite.position.set(landmark.target.x, surfaceY + 10, landmark.target.z);
        scene.add(markerSprite);
        markers.push({ mesh: markerSprite, landmark: landmark, index: index });

        // Create an HTML banner for the marker
        const banner = document.createElement('div');
        banner.className = 'landmark-banner';
        banner.innerText = landmark.name;
        banner.style.cssText = `
            position: fixed;
            background: rgba(255, 255, 255, 1);
            color: black;
            padding: 8px 12px;
            border-radius: 1px;
            font-size: 12px;
            font-weight: bold;
            pointer-events: auto;
            cursor: pointer;
            white-space: nowrap;
            display: none;
            z-index: 100;
            border: 2px solid #208644;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        `;

        banner.addEventListener('click', () => {
            const detailPanel = document.getElementById('detail-panel');
            const detailTitle = document.getElementById('detail-title');
            const detailDesc = document.getElementById('detail-desc');
            const detailTitu = document.getElementById('detail-titu');
            const detailType = document.getElementById('detail-type');

            detailTitle.innerText = landmark.name;
            detailDesc.innerText = landmark.desc;
            detailTitu.innerText = landmark.titu;
            detailType.innerText = landmark.type;
            
            if (landmark.doc) {
                const pdfModal = document.getElementById('pdf-modal');
                const pdfFrame = document.getElementById('pdf-frame');
                pdfFrame.src = landmark.doc;
                pdfModal.classList.remove('hidden');
                detailPanel.classList.add('hidden');
            } else {
                detailPanel.classList.remove('hidden');
            }

            // Calculate the view offset to maintain the original camera angle
            const viewOffset = new THREE.Vector3().subVectors(initialCamPos, initialTarget);

            // The new target is exactly where the marker is (which includes the surfaceY correction)
            const newTarget = markerSprite.position.clone();

            // The new camera position simply pans the view offset over the new target
            const newCamPos = new THREE.Vector3().addVectors(newTarget, viewOffset);

            flyTo(newCamPos, newTarget, landmark.zoom);
        });

        document.body.appendChild(banner);
        markerLabels.push({ element: banner, worldPos: markerSprite.position, index: index });
    });
}
function updateMarkerLabels() {
    markerLabels.forEach(label => {
        const vector = new THREE.Vector3();
        vector.copy(label.worldPos);
        vector.project(camera);

        // Convert to screen coordinates
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

        // Only show if in front of camera
        if (vector.z < 1) {
            label.element.style.left = (x - label.element.offsetWidth / 2) + 'px';
            label.element.style.top = (y - 40) + 'px'; // 40px above the marker
            label.element.style.display = 'block';
        } else {
            label.element.style.display = 'none';
        }
    });
}

function setupUI() {
    const detailPanel = document.getElementById('detail-panel');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailTitu = document.getElementById('detail-titu');
    const detailType = document.getElementById('detail-type');
    const pdfModal = document.getElementById('pdf-modal');
    const pdfFrame = document.getElementById('pdf-frame');

    document.getElementById('close-panel-btn').addEventListener('click', () => {
        detailPanel.classList.add('hidden');
        flyTo(initialCamPos, initialTarget, initialZoom);
    });

    document.getElementById('reset-view-btn').addEventListener('click', () => {
        detailPanel.classList.add('hidden');
        flyTo(initialCamPos, initialTarget, initialZoom);
    });

    document.getElementById('close-pdf-btn').addEventListener('click', () => {
        pdfModal.classList.add('hidden');
        pdfFrame.src = '';
        flyTo(initialCamPos, initialTarget, initialZoom);
    });
}

function flyTo(camPos, targetPos, targetZoom = 1) {
    if (!initialCamPos.lengthSq() && !initialCamPos.x) return; // not initialized
    controls.enabled = false; // freeze user interaction during flight

    startCamPos.copy(camera.position);
    startTarget.copy(controls.target);
    startZoom = camera.zoom;

    endCamPos.copy(camPos);
    endTarget.copy(targetPos);
    endZoom = targetZoom;

    animStartTime = performance.now();
    isAnimating = true;
}

init();
