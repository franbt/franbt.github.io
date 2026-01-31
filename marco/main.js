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
camera.position.set(526, 538, -200);

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

const loader.load("terrain.glb", (gltf) => { 
  const terrain = gltf.scene; 
  scene.add(terrain); 
  terrain.traverse((obj) => { 
    if (obj.isMesh && obj.name.includes("building")) {
      obj.material = new THREE.MeshStandardMaterial({
        color: 0xff5555, // soft red 
        }); 
    } 
  }); 
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
