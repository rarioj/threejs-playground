import * as THREE from "three";
import { scene, clock, camera, light, renderer, controls } from "./init.js";
import { createBox, loadText, loadModel } from "./tools.js";

const modelSettings = {
  spaceship: {
    model: "/models/star_sparrow_modular_spaceship/scene.gltf",
    scale: {
      x: 20,
      y: 20,
      z: 20,
    },
    position: {
      x: 0,
      y: 0,
      z: 200,
    },
  },
  cameraman: {
    model: "/models/cameraman_walking/scene.gltf",
    scale: {
      x: 25,
      y: 25,
      z: 25,
    },
    position: {
      x: 150,
      y: 0,
      z: 0,
    },
  },
  family: {
    model: "/models/low_poly_people_free_sample_pack/scene.gltf",
    scale: {
      x: 25,
      y: 25,
      z: 25,
    },
    position: {
      x: -175,
      y: 0,
      z: -20,
    },
  },
};

let title,
  models = {},
  mixers = {};

// Callback for requestAnimationFrame
// https://www.w3schools.com/jsref/met_win_requestanimationframe.asp
function animate(time) {
  const deltaTime = clock.getDelta();
  if (mixers) {
    for (const [index, mixer] of Object.entries(mixers)) {
      if (mixer) {
        mixer.update(deltaTime);
      }
    }
  }
  if (models.cameraman) {
    models.cameraman.scene.rotation.y += 0.01;
  }
  if (camera.position.z <= 500) {
    camera.position.z += 0.1;
  }
  controls.update();
  render();
  requestAnimationFrame(animate);
}

// Renders the scene
function render() {
  renderer.render(scene, camera);
}

// Start the playground
export async function start() {
  title = await loadText(
    "3D Animated Models",
    "/fonts/helvetiker_regular.typeface.json",
    20,
    10,
    0xffccaa
  );
  title.position.set(-150, 80, -40);
  scene.add(title);

  for (const [index, setting] of Object.entries(modelSettings)) {
    const model = await loadModel(setting.model);
    const mixer = new THREE.AnimationMixer(model.scene);
    model.scene.scale.set(setting.scale.x, setting.scale.y, setting.scale.z);
    model.scene.position.set(
      setting.position.x,
      setting.position.y,
      setting.position.z
    );
    model.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
    models[index] = model;
    mixers[index] = mixer;
    scene.add(model.scene);
  }

  document.body.appendChild(renderer.domElement);
  requestAnimationFrame(animate);
}
