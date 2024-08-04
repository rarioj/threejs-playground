import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene @ https://threejs.org/docs/#api/en/scenes/Scene
const scene = new THREE.Scene();

// Camera @ https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
const camera = new THREE.PerspectiveCamera(
  50, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  1, // near clipping plane
  1500 // far clipping plane
);

// Point light @ https://threejs.org/docs/#api/en/lights/PointLight
const pointLight = new THREE.PointLight(
  0xffffff, // color
  4.5, // intensity
  0, // distance
  0 // decay
);

// WebGL renderer @ https://threejs.org/docs/#api/en/renderers/WebGLRenderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

// Orbit controls @ https://threejs.org/docs/#examples/en/controls/OrbitControls
const controls = new OrbitControls(
  camera, // camera
  renderer.domElement // canvas container
);

// The setup
camera.position.set(0, 0, 0);
camera.lookAt(0, 0, 0);
scene.background = new THREE.Color(0x333333);
scene.fog = new THREE.Fog(0x333333, 0, 1500);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
pointLight.position.set(0, 0, 1000);
scene.add(pointLight);
controls.listenToKeyEvents(window);
controls.enableDamping = true;
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
