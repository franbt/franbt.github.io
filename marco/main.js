import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(819, 461, 448);
camera.rotation.set(44.26, -0.000004, 72.8);

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
  console.log("Loaded:", gltf); 
  scene.add(gltf.scene); 
});

gltf.scene.traverse(obj => { if (obj.isMesh && obj.name.includes("building")) { if (isInsideAOI(obj.position)) { obj.material.color.set(0xF0EDE5); // Cloud Dancer } else { obj.material.color.set(0xcccccc); // neutral } } });

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
