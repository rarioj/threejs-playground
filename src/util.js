import * as THREE from "three";
import { default as validate } from "/src/validator.js";

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
