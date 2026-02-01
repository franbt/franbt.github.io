import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 5000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMappingExposure = 0.7;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

const sun = new THREE.DirectionalLight(0xffffff, 0.5); 
sun.position.set(80, 120, 60); 
sun.color.setRGB(1, 0.95, 0.9); 
sun.castShadow = true;
sun.shadow.camera.left = -500; 
sun.shadow.camera.right = 500; 
sun.shadow.camera.top = 500; 
sun.shadow.camera.bottom = -500; 
sun.shadow.camera.near = 1; 
sun.shadow.camera.far = 1000; 
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);

const light = new THREE.AmbientLight(0xffffff, 0.05);
light.castShadow = true; 
scene.add(light);

const loader = new GLTFLoader(); 
loader.load("terrain.glb", (gltf) => { 
  const cam = gltf.scene.getObjectByName("Camera");
  camera.left = cam.left; 
  camera.right = cam.right; 
  camera.top = cam.top; 
  camera.bottom = cam.bottom; 
  camera.near = cam.near; 
  camera.far = cam.far; 
  camera.position.copy(cam.position); 
  camera.quaternion.copy(cam.quaternion);
  camera.updateProjectionMatrix();
  gltf.scene.traverse((obj) => { 
    if (obj.isMesh) { 
      obj.castShadow = true; 
      obj.receiveShadow = true; 
    } 
  });
  gltf.scene.traverse((obj) => { 
    if (obj.isMesh && obj.material) {
      obj.material.roughness = 0.9; 
      obj.material.metalness = 0.0; 
    } 
  });
  scene.add(gltf.scene); 
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
