import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function validate(options, properties) {
  let currentType = "";
  if (typeof options === "object" && options !== null) {
    for (const [key, type] of Object.entries(properties)) {
      if (typeof options[key] === "undefined") {
        currentType = "undefined";
      }
      if (options[key] === null) {
        currentType = "null";
      }
      currentType = Object.prototype.toString
        .call(options[key])
        .match(/^\[object\s(.*)\]$/)[1];
      if (currentType === "Object") {
        if (options[key].constructor && options[key].constructor.name) {
          currentType = options[key].constructor.name;
        }
      }
      if (currentType !== type) {
        throw new TypeError(
          "Property " + key + " must be " + type + ", not " + currentType
        );
      }
    }
  }
  return true;
}

export function createMeshBox(options) {
  if (
    validate(options, {
      width: "Number",
      height: "Number",
      depth: "Number",
      color: "Number",
    })
  ) {
    const geometry = new THREE.BoxGeometry(
      options.width,
      options.height,
      options.depth
    );
    const material = new THREE.MeshPhongMaterial({ color: options.color });
    const box = new THREE.Mesh(geometry, material);
    return box;
  }
  return null;
}

export function createLineBox(options) {
  if (
    validate(options, {
      width: "Number",
      height: "Number",
      depth: "Number",
      color: "Number",
    })
  ) {
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
  return null;
}

export function createLineRectangle(options) {
  if (
    validate(options, {
      width: "Number",
      length: "Number",
      color: "Number",
    })
  ) {
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
  return null;
}

export function createLineTriangle(options) {
  if (
    validate(options, {
      length: "Number",
      color: "Number",
    })
  ) {
    const geometry = new THREE.CircleGeometry(options.length * Math.sqrt(3), 3);
    const material = new THREE.LineBasicMaterial({ color: options.color });
    const line = new THREE.Line(geometry, material);
    return line;
  }
  return null;
}

export function createLineCircle(options) {
  if (
    validate(options, {
      radius: "Number",
      segment: "Number",
      color: "Number",
    })
  ) {
    const geometry = new THREE.CircleGeometry(options.radius, options.segment);
    const material = new THREE.LineBasicMaterial({ color: options.color });
    const line = new THREE.Line(geometry, material);
    return line;
  }
  return null;
}

export function createText(options) {
  if (
    validate(options, {
      text: "String",
      size: "Number",
      color: "Number",
    })
  ) {
    const loader = new FontLoader();
    const text = new Promise((resolve, reject) => {
      loader.load(
        "/scripts/fonts/optimer_regular.typeface.json",
        function (font) {
          const geometry = new TextGeometry(options.text, {
            font: font,
            size: options.size,
            depth: 10,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 10,
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
        }
      );
    });
    return text;
  }
  return null;
}

export function createModel(options) {
  if (
    validate(options, {
      model: "String",
    })
  ) {
    const loader = new GLTFLoader();
    const model = new Promise((resolve, reject) => {
      loader.load(
        "/models/" + options.model + "/scene.gltf",
        async function (gltf) {
          resolve(gltf.scene);
        },
        undefined,
        function (error) {
          console.error(error);
          reject(error);
        }
      );
    });
    return model;
  }
  return null;
}
