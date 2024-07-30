import * as THREE from "three";

class PlayGround {
  constructor() {
    // @ https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      1, // near clipping plane
      500 // far clipping plane
    );
    this.camera.position.set(0, 0, 0); // x, y, z
    this.camera.lookAt(0, 0, 0); // x, y, z
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  createBox() {
    const geometry = new THREE.BoxGeometry(1, 2, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xccff33 });
    const box = new THREE.Mesh(geometry, material);
    return box;
  }
  createLine() {
    const material = new THREE.LineBasicMaterial({ color: 0xccff33 });
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    points.push(new THREE.Vector3(0, -10, 0));
    points.push(new THREE.Vector3(-10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    return line;
  }
}

export function init() {
  const playground = new PlayGround();
  document.body.appendChild(playground.renderer.domElement);

  const box = playground.createBox();
  const line = playground.createLine();
  playground.scene.add(box);
  playground.scene.add(line);
  playground.renderer.setAnimationLoop(() => {
    box.rotation.x += 0.05;
    box.rotation.y += 0.05;
    box.rotation.z += 0.05;
    line.rotation.x += 0.05;
    line.rotation.y += 0.05;
    line.rotation.z += 0.05;
    if (playground.camera.position.z <= 100) {
      playground.camera.position.z += 0.5;
    }
    playground.renderer.render(playground.scene, playground.camera);
  });
}
