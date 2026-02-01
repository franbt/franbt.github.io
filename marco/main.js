import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 5000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

const sun = new THREE.DirectionalLight(0xffffff, 1.2); 
sun.position.set(300, 400, 200); 
scene.add(sun);

const light = new THREE.AmbientLight(0xffffff, 0.3);
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
  camera.zoom = 1 / 1644.0;
  camera.updateProjectionMatrix();
  const shiftX_pixels = 0.03 * width; 
  const shiftY_pixels = -0.08 * height;
  camera.setViewOffset( 
    width, 
    height, 
    shiftX_pixels, 
    shiftY_pixels, 
    width, 
    height 
  );
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
