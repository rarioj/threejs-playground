import * as THREE from "three";
import { default as validate } from "/src/validator.mjs";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export function createMeshBox(options) {
  if (
    !validate(options, {
      width: "Number",
      height: "Number",
      depth: "Number",
      color: "Number",
    })
  ) {
    return null;
  }
  const geometry = new THREE.BoxGeometry(
    options.width,
    options.height,
    options.depth
  );
  const material = new THREE.MeshBasicMaterial({ color: options.color });
  const box = new THREE.Mesh(geometry, material);
  return box;
}

export function createLineBox(options) {
  if (
    !validate(options, {
      width: "Number",
      height: "Number",
      depth: "Number",
      color: "Number",
    })
  ) {
    return null;
  }
  const geometry = new THREE.BoxGeometry(
    options.width,
    options.height,
    options.depth
  );
  const edges = new THREE.EdgesGeometry(geometry);
  const material = new THREE.LineBasicMaterial({ color: options.color });
  const box = new THREE.LineSegments(edges, material);
  return box;
}

export function createLineRectangle(options) {
  if (
    !validate(options, {
      width: "Number",
      length: "Number",
      color: "Number",
    })
  ) {
    return null;
  }
  const material = new THREE.LineBasicMaterial({ color: options.color });
  const points = [];
  const halfWidth = options.width / 2;
  const halfLength = options.length / 2;
  points.push(new THREE.Vector3(-halfLength, -halfWidth, 0));
  points.push(new THREE.Vector3(-halfLength, halfWidth, 0));
  points.push(new THREE.Vector3(halfLength, halfWidth, 0));
  points.push(new THREE.Vector3(halfLength, -halfWidth, 0));
  points.push(new THREE.Vector3(-halfLength, -halfWidth, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  return line;
}

export function createLineTriangle(options) {
  if (
    !validate(options, {
      length: "Number",
      color: "Number",
    })
  ) {
    return null;
  }
  const geometry = new THREE.CircleGeometry(options.length * Math.sqrt(3), 3);
  const material = new THREE.LineBasicMaterial({ color: options.color });
  const line = new THREE.Line(geometry, material);
  return line;
}

export function createLineCircle(options) {
  if (
    !validate(options, {
      radius: "Number",
      segment: "Number",
      color: "Number",
    })
  ) {
    return null;
  }
  const geometry = new THREE.CircleGeometry(options.radius, options.segment);
  const material = new THREE.LineBasicMaterial({ color: options.color });
  const line = new THREE.Line(geometry, material);
  return line;
}

export function createText(options) {
  if (
    !validate(options, {
      text: "String",
      size: "Number",
      color: "Number",
    })
  ) {
    return null;
  }
  const loader = new FontLoader();
  const text = new Promise((resolve, reject) => {
    loader.load("/src/fonts/helvetiker_regular.typeface.json", function (font) {
      const geometry = new TextGeometry(options.text, {
        font: font,
        size: options.size,
        depth: 5,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 5,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      geometry.computeBoundingBox();
      const materials = [
        new THREE.MeshPhongMaterial({
          color: options.color,
          flatShading: true,
        }), // front
        new THREE.MeshPhongMaterial({ color: options.color }), // side
      ];
      const text = new THREE.Mesh(geometry, materials);
      text.position.x =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      text.position.y = 30;
      text.position.z = 0;
      text.rotation.x = 0;
      text.rotation.y = Math.PI * 2;
      resolve(text);
    });
  });
  return text;
}
