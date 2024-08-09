import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene ......................................................................
// https://threejs.org/docs/#api/en/scenes/Scene
const scene = new THREE.Scene();

// Clock ......................................................................
// https://threejs.org/docs/#api/en/core/Clock
const clock = new THREE.Clock();

// Camera .....................................................................
// Perspective camera
// https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
const camera = new THREE.PerspectiveCamera(
  50, // fov (field of view)
  window.innerWidth / window.innerHeight, // aspect (ratio)
  1, // near (clipping plane)
  1500 // far (clipping plane)
);

// Light ......................................................................
// Point light
// https://threejs.org/docs/#api/en/lights/PointLight
const light = new THREE.PointLight(
  0xffffff, // color
  5, // intensity
  0, // distance
  0 // decay
);

// Renderer ...................................................................
// WebGL renderer
// https://threejs.org/docs/#api/en/renderers/WebGLRenderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

// Controls ...................................................................
// Orbit controls
// https://threejs.org/docs/#examples/en/controls/OrbitControls
const controls = new OrbitControls(
  camera, // camera
  renderer.domElement // canvas container
);

// Setup ......................................................................
scene.background = new THREE.Color(0x999999);
scene.fog = new THREE.Fog(0x333333, 0, 1500);
camera.position.set(200, 200, 10);
camera.lookAt(0, 0, 0);
light.position.set(0, 0, 500);
scene.add(light);
renderer.setClearColor(0xff0000, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // full screen
controls.listenToKeyEvents(window);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 1500;
controls.maxPolarAngle = Math.PI / 2;

export { scene, clock, camera, light, renderer, controls };
