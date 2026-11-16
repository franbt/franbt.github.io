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
    // Ribera del Marco
    { name: "Charca del Marco", apunt: "Origen del caudal de la Rivera del Marco", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/OASIS-NATURAL.pdf", desc: "También llamada 'Fuente del Rey', procede de la filtración de agua del Calerizo y llega a través de un sifón natural. Sus aguas transcurren de sureste a noreste por la Ribera.", titu: "Ribera del Marco", type: "Acuífero", target: { x: 624, y: 0, z: 1644 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Ribera del Marco", apunt: "Demarcación", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/VIDA-VEGETAL.pdf", desc: "El entorno de la Ribera del Marco en Cáceres es una zona de gran valor ecológico y paisajístico, caracterizada por la presencia de un arroyo con vegetación de ribera que contrasta con el entorno urbano.", titu: "Ribera del Marco", type: "Arroyo", target: { x: 653, y: 0, z: 596 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Fría", apunt: "Fuente Municipal", doc: "", desc: "La Fuente Fría se encuentra en el Centro-Casco Antiguo de Cáceres, situada específicamente detrás del antiguo monasterio de San Francisco.  Es un punto de interés turístico y patrimonial destacado por la excelente calidad de sus aguas.Los vecinos de Cáceres siguen acudiendo a ella para abastecerse de agua.", titu: "Ribera del Marco", type: "Fuente", target: { x: 329, y: 30, z: 202 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Concejo", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-CONCEJO.pdf", desc: "La Fuente Concejo es considerada la fuente más importante de la ciudad de Cáceres.  Fue ordenada construir por D. Alfonso Golfín a finales del siglo XV y destaca por un escudo real labrado en piedra, datado en el reinado de Juan II. La estructura cuenta con un depósito cubierto por una bóveda sostenida por seis arcos que dan hacia la Ribera del Marco, una explanada que históricamente servía como lugar de reunión.  Para acceder a ella desde la Ciudad Monumental, la puerta más cercana es el Arco del Cristo.", titu: "Ribera del Marco", type: "Fuente", target: { x: 219, y: 20, z: -221 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Rocha", apunt: "Fuente Municipal", doc: "", desc: "Fuente Rocha es un monumento de estilo neomudéjar situado en el casco antiguo de Cáceres, específicamente en la Calle Concordia.  Aunque su caudal nunca fue abundante, esta fuente tuvo gran importancia histórica al abastecer a los vecinos de la Barriada de San Marquino hasta la década de 1950.", titu: "Ribera del Marco", type: "Fuente", target: { x: 378, y: 20, z: -459 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Huertos de San Jorge", apunt: "Huertos Municipales", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/HUERTOS.pdf", desc: "Los Huertos de la Ribera del Marco constituyen un elemento de gran relevancia histórica, ambiental y social dentro del paisaje tradicional de Cáceres. Estos huertos, ligados desde antiguo al aprovechamiento del agua del arroyo del Marco, representan un ejemplo singular de agricultura de ribera integrada en un entorno urbano, manteniendo prácticas agrícolas tradicionales adaptadas al medio natural.", titu: "Ribera del Marco", type: "Huertos", target: { x: 373, y: 20, z: -714 }, pinLength: 55, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Huertos de los Carvajales", apunt: "Huertos Municipales", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/HUERTOS.pdf", desc: "Los Huertos de la Ribera del Marco constituyen un elemento de gran relevancia histórica, ambiental y social dentro del paisaje tradicional de Cáceres. Estos huertos, ligados desde antiguo al aprovechamiento del agua del arroyo del Marco, representan un ejemplo singular de agricultura de ribera integrada en un entorno urbano, manteniendo prácticas agrícolas tradicionales adaptadas al medio natural.", titu: "Ribera del Marco", type: "Huertos", target: { x: 680, y: 20, z: -1466 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    //Paseo Cánovas
    { name: "Fuente de Los Cisnes", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DE-LOS-CISNES-Y-FUENTE-DE-LOS-TRITONES-.pdf", desc: "Fuente de Los Cisnes", titu: "Paseo de Cánovas", type: "Fuente", target: { x: -949, y: 20, z: 90 }, pinLength: 35, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente de los Tritones", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DE-LOS-CISNES-Y-FUENTE-DE-LOS-TRITONES-.pdf", desc: "Fuente de los Tritones", titu: "Paseo de Cánovas", type: "Fuente", target: { x: -817, y: 20, z: -134 }, pinLength: 56, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Luminosa", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-LUMINOSA-.pdf", desc: "Fuente ornamental y punto de referencia de la Avda.de España en el centro urbano de Cáceres, situada junto al Paseo de Cánovas.", titu: "Paseo de Cánovas", type: "Fuente", target: { x: -767, y: 20, z: -223 }, pinLength: 78, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente de las Ninfas", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DE-LAS-NINFAS.pdf", desc: "Esta fuente forma parte del conjunto escultórico y ornamental del Parque del Rodeo.", titu: "Parque del Rodeo", type: "Fuente", target: { x: -257, y: 20, z: 664 }, pinLength: 35, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Parque del Rodeo", apunt: "Demarcación", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/Feria-del-ganado-El-Rodeo.pdf", desc: "El nombre “Rodeo” hace referencia a su uso histórico: desde finales del siglo XIX hasta los años 70 del siglo XX, fue el recinto donde se celebraban ferias de ganado.", titu: "Parque del Rodeo", type: "Parque", target: { x: -158, y: 20, z: 478 }, pinLength: 56, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    //Plaza Mayor
    { name: "Plaza Mayor", apunt: "Demarcación", doc: "", desc: "La Plaza Mayor de Cáceres es una de las plazas más bonitas de España.  Es un lugar histórico donde se han celebrado muchos eventos importantes.", titu: "Plaza Mayor", type: "Plaza", target: { x: -204, y: 20, z: -634 }, pinLength: 30, offset: { x: 0, y: 0, z: 0 }, zoom: 5 },
    { name: "Fuente del Foro de los Balbos", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DEL-FORO-DE-LOS-BALBOS-Caceres.pdf", desc: "La Fuente del Foro de los Balbos es una fuente ornamental situada en el Foro de los Balbos, también conocido como Atrio del Corregidor, junto a la Plaza Mayor y la muralla de Cáceres. ", titu: "Plaza Mayor", type: "Fuente", target: { x: -141, y: 20, z: -641 }, pinLength: 50, offset: { x: 0, y: 0, z: 0 }, zoom: 5 },
    //Parque del Principe
    { name: "Fuente Aguas Vivas", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DE-AGUAS-VIVAS-.pdf", desc: "La Fuente de Aguas Vivas es una construcción medieval del siglo XIV situada fuera de la muralla, junto al antiguo camino de Plasencia, lo que explica su frecuente uso por caminantes y viajeros.", titu: "Aguas Vivas", type: "Fuente", target: { x: -1144, y: 0, z: -1465 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente Hinche", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/HINCHE.pdf", desc: "Situada en el viejo Camino de Fuente Hinche, documentos del siglo XVIII nos informan de las propiedades medicinales de sus aguas y sus usos.", titu: "Parque del Principe", type: "Fuente", target: { x: -1789, y: 20, z: -918 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente de la Madrila", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DE-LA-MADRILA.pdf", desc: "La Fuente de la Madrila se sitúa frente al paseo central del Parque del Príncipe.", titu: "Parque del Principe", type: "Fuente", target: { x: -1378, y: 20, z: -768 }, pinLength: 68, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Parque del Principe", apunt: "Demarcación", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/Historia.pdf", desc: "El Parque del Príncipe de Cáceres, en pleno centro urbano, es el principal pulmón verde de la ciudad. Es uno de los parques más utilizados por los cacereños/as, el más icónico y amplio de la ciudad, y una visita obligada para turistas.", titu: "Parque del Principe", type: "Parque", target: { x: -1421, y: 20, z: -549 }, pinLength: 56, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "La Estufa Fría", apunt: "Invernadero Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/Visitar-la-estufa-fria.pdf", desc: "La Estufa Fría de Cáceres, también conocida como Estufa del Parque del Príncipe, es un invernadero que alberga una valiosa colección de plantas tropicales y subtropicales. Se encuentra en el Parque del Príncipe, uno de los espacios verdes más importantes de la ciudad.", titu: "Parque del Principe", type: "Invernadero", target: { x: -1504, y: 20, z: -271 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    //Santuario Virgen de la Montaña
    { name: "Santuario Virgen de la Montaña", apunt: "Demarcación", doc: "", desc: "", titu: "Santuario Virgen de la Montaña", type: "Santuario", target: { x: 2029, y: 20, z: 1053 }, pinLength: 30, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente del Santuario Virgen de la Montaña", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/FUENTE-DEL-SANTUARIO-VIRGEN-DE-LA-MONTANA-.pdf", desc: "La fuente que se encuentra junto al Santuario de la Virgen de la Montaña es una fuente moderna destinada a agua potable para los visitantes y peregrinos que suben hasta el santuario.", titu: "Santuario Virgen de la Montaña", type: "Fuente", target: { x: 2073, y: 20, z: 1134 }, pinLength: 60, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },
    { name: "Fuente del Corcho", apunt: "Fuente Municipal", doc: "https://olimpo2.up-cife.com/wp-content/uploads/2026/01/CORCHO.pdf", desc: "La Fuente del Corcho (o del Corchito, quizá es de las fuentes más desconocidas por los cacereños", titu: "Santuario Virgen de la Montaña", type: "Fuente", target: { x: 1171, y: 20, z: -198 }, offset: { x: 0, y: 0, z: 0 }, zoom: 3 },

];

let initialFrustumHeight = 1000;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const terrainObjects = [];
const markers = [];
const markerLabels = [];
let currentLandmarkIndex = -1;
const expandedGroups = new Set();

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
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
    };

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
    const loadingText = document.getElementById('loading-text');
    const loadingBar = document.getElementById('loading-bar');

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
                const percent = (xhr.loaded / xhr.total) * 100;
                if (loadingBar) loadingBar.style.width = percent + '%';
            } else {
                if (loadingBar) loadingBar.style.width = '100%';
            }
        },
        function (error) {
            console.error('An error happened', error);
            if (loadingText) loadingText.innerText = 'Error loading model. Check console.';
            loadingElem.style.background = 'rgba(255, 0, 0, 0.7)';
        }
    );

    window.addEventListener('resize', onWindowResize);

    animate();
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
function updateMarkersVisibility() {
    markers.forEach(m => {
        const landmark = m.landmark;
        const isDemarcacion = landmark.apunt === "Demarcación";
        const groupExpanded = expandedGroups.has(landmark.titu);
        const shouldBeVisible = isDemarcacion || groupExpanded;
        m.mesh.visible = shouldBeVisible;
    });
}

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

        banner.addEventListener('click', () => {
            if (landmark.apunt === "Demarcación") {
                if (expandedGroups.has(landmark.titu)) {
                    expandedGroups.delete(landmark.titu);
                    updateMarkersVisibility();
                    
                    // If the current landmark is in this collapsed group, close the panel and reset view
                    if (currentLandmarkIndex !== -1 && landmarks[currentLandmarkIndex].titu === landmark.titu) {
                        const detailPanel = document.getElementById('detail-panel');
                        detailPanel.classList.add('hidden');
                        currentLandmarkIndex = -1;
                        flyTo(initialCamPos, initialTarget, initialZoom);
                    }
                } else {
                    expandedGroups.clear();
                    expandedGroups.add(landmark.titu);
                    updateMarkersVisibility();
                    openLandmark(index);
                }
            } else {
                openLandmark(index);
            }
        });

        if (landmark.pinLength !== undefined) {
            banner.style.setProperty('--pin-length', landmark.pinLength + 'px');
        }

        document.getElementById('ui-layer').appendChild(banner);
        markerLabels.push({ element: banner, worldPos: markerSprite.position, index: index });
    });

    // Initialize visibility so that only Demarcación markers are shown at startup
    updateMarkersVisibility();
}
function updateMarkerLabels() {
    const visibleLabels = [];

    markerLabels.forEach(label => {
        const vector = new THREE.Vector3();
        vector.copy(label.worldPos);
        vector.project(camera);

        // Convert to screen coordinates
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

        // Only show if in front of camera and marker mesh is visible
        const markerData = markers.find(m => m.index === label.index);
        const isVisible = markerData ? markerData.mesh.visible : true;

        if (vector.z < 1 && isVisible) {
            const landmarkData = landmarks[label.index];
            const pinLen = landmarkData.pinLength !== undefined ? landmarkData.pinLength : 40;

            label.element.style.left = (x - label.element.offsetWidth / 2) + 'px';
            label.element.style.top = (y - pinLen - label.element.offsetHeight) + 'px';
            label.element.style.display = 'block';

            visibleLabels.push({ label: label, depth: vector.z });
        } else {
            label.element.style.display = 'none';
        }
    });

    // Sort by depth (descending: furthest first)
    visibleLabels.sort((a, b) => b.depth - a.depth);

    // Assign z-index dynamically based on distance to camera
    visibleLabels.forEach((item, index) => {
        item.label.element.style.zIndex = index + 1;
    });
}

function openLandmark(index) {
    currentLandmarkIndex = index;
    const landmark = landmarks[index];

    // Automatically expand group when a landmark is opened (e.g. via prev/next buttons)
    if (!expandedGroups.has(landmark.titu)) {
        expandedGroups.add(landmark.titu);
        updateMarkersVisibility();
    }

    const markerData = markers.find(m => m.index === index);
    if (!markerData) return;

    const detailPanel = document.getElementById('detail-panel');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailTitu = document.getElementById('detail-titu');
    const detailType = document.getElementById('detail-type');
    const openPdfBtn = document.getElementById('open-pdf-btn');

    detailTitle.innerText = landmark.name;
    detailDesc.innerText = landmark.desc;
    detailTitu.innerText = landmark.titu;
    detailType.innerText = landmark.type;

    if (landmark.doc) {
        openPdfBtn.style.display = 'block';
        openPdfBtn.onclick = () => {
            const pdfModal = document.getElementById('pdf-modal');
            const pdfFrame = document.getElementById('pdf-frame');
            pdfFrame.src = landmark.doc;
            pdfModal.classList.remove('hidden');
            detailPanel.classList.add('hidden');
        };
    } else {
        openPdfBtn.style.display = 'none';
        openPdfBtn.onclick = null;
    }
    detailPanel.classList.remove('hidden');

    const viewOffset = new THREE.Vector3().subVectors(initialCamPos, initialTarget);
    const newTarget = markerData.mesh.position.clone();
    const newCamPos = new THREE.Vector3().addVectors(newTarget, viewOffset);

    flyTo(newCamPos, newTarget, landmark.zoom);
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
        currentLandmarkIndex = -1;
        flyTo(initialCamPos, initialTarget, initialZoom);
    });

    document.getElementById('prev-landmark-btn').addEventListener('click', () => {
        if (currentLandmarkIndex !== -1) {
            let nextIndex = currentLandmarkIndex - 1;
            if (nextIndex < 0) nextIndex = landmarks.length - 1;
            openLandmark(nextIndex);
        }
    });

    document.getElementById('next-landmark-btn').addEventListener('click', () => {
        if (currentLandmarkIndex !== -1) {
            let nextIndex = currentLandmarkIndex + 1;
            if (nextIndex >= landmarks.length) nextIndex = 0;
            openLandmark(nextIndex);
        }
    });

    document.getElementById('reset-view-btn').addEventListener('click', () => {
        detailPanel.classList.add('hidden');
        currentLandmarkIndex = -1;
        flyTo(initialCamPos, initialTarget, initialZoom);
    });

    document.getElementById('close-pdf-btn').addEventListener('click', () => {
        pdfModal.classList.add('hidden');
        pdfFrame.src = '';
        detailPanel.classList.remove('hidden');
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
