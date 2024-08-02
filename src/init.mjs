import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Camera
const camera = new THREE.PerspectiveCamera(
  45, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  1, // near clipping plane
  15000 // far clipping plane
);
camera.position.set(0, 0, 0); // x, y, z
camera.lookAt(0, 0, 0); // x, y, z

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);
scene.fog = new THREE.Fog(0x333333, 0, 15000);

// Directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(0, 0, 0).normalize();
scene.add(dirLight);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
pointLight.position.set(0, 0, 1000);
scene.add(pointLight);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 1500;
controls.maxPolarAngle = Math.PI / 2;

export default {
  camera: camera,
  scene: scene,
  renderer: renderer,
  controls: controls,
};
