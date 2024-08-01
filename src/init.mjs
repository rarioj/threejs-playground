import * as THREE from "three";

// Camera
const camera = new THREE.PerspectiveCamera(
  30, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  1, // near clipping plane
  1500 // far clipping plane
);
camera.position.set(0, 0, 0); // x, y, z
camera.lookAt(0, 0, 0); // x, y, z

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 250, 1400);

// Directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0, 0, 1).normalize();
scene.add(dirLight);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
pointLight.color.setHSL(Math.random(), 1, 0.5);
pointLight.position.set(0, 100, 1000);
scene.add(pointLight);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

export default {
  camera: camera,
  scene: scene,
  renderer: renderer,
};
