import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load Map and Car Models
const loader = new FBXLoader();
let car;

// Load the map
loader.load('map.fbx', (map) => {
  map.scale.set(0.1, 0.1, 0.1);
  scene.add(map);
});

// Load the car
loader.load('car.fbx', (loadedCar) => {
  loadedCar.scale.set(0.1, 0.1, 0.1);
  car = loadedCar;
  scene.add(car);
});

// Basic car movement
const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function animate() {
  requestAnimationFrame(animate);

  if (car) {
    if (keys['ArrowUp']) car.position.z -= 0.1;  // Forward
    if (keys['ArrowDown']) car.position.z += 0.1;  // Backward
    if (keys['ArrowLeft']) car.rotation.y += 0.05;  // Left turn
    if (keys['ArrowRight']) car.rotation.y -= 0.05;  // Right turn
  }

  renderer.render(scene, camera);
}

animate();
