import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Creates a 3D box object.
 * @param {number} width - The width of the box.
 * @param {number} height - The height of the box.
 * @param {number} depth - The depth of the box.
 * @param {number} color - The color of the box (e.g. 0xffaacc).
 * @param {boolean} isSolid - Wether the box is a solid mesh object.
 * @see {@link https://threejs.org/docs/#api/en/geometries/BoxGeometry|BoxGeometry}
 */
export function createBox(width, height, depth, color, isSolid) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  if (isSolid) {
    return new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({ color: color })
    );
  } else {
    return new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: color })
    );
  }
}

/**
 * Loads a font and creates a 3D text object.
 * @async
 * @param {string} text - The text.
 * @param {string} font - The path to the font file.
 * @param {number} size - The size of the text.
 * @param {number} depth - The depth of the text.
 * @param {number} color - The color of the text (e.g. 0xffaacc).
 * @see {@link https://threejs.org/docs/#examples/en/loaders/FontLoader|FontLoader}
 * @see {@link https://threejs.org/docs/#examples/en/geometries/TextGeometry|TextGeometry}
 */
export async function loadText(text, font, size, depth, color) {
  const loaded = new Promise(function (resolve, reject) {
    const loader = new FontLoader();
    loader.load(
      font,
      async function (loadedFont) {
        const geometry = new TextGeometry(text, {
          font: loadedFont,
          size: size,
          depth: depth,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 0,
          bevelSize: 0,
          bevelOffset: 0,
          bevelSegments: 1,
        });
        const mesh = new THREE.Mesh(geometry, [
          // front
          new THREE.MeshPhongMaterial({
            color: color,
            flatShading: true,
          }),
          // side
          new THREE.MeshPhongMaterial({ color: color }),
        ]);
        geometry.computeBoundingBox();
        mesh.position.x =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        resolve(mesh);
      },
      function (xhr) {
        const percent = (xhr.loaded / xhr.total) * 100;
        if (percent >= 100) {
          console.log("Font: " + font + " loaded.");
        }
      },
      function (error) {
        console.error(error);
        reject(null);
      }
    );
  });
  return loaded;
}

/**
 * Loads a GLTF (GL Transmission Format) 3D model.
 * @async
 * @param {string} model - The path to the GLTF model file.
 * @see {@link https://threejs.org/docs/#examples/en/loaders/GLTFLoader|GLTFLoader}
 */
export async function loadModel(model) {
  const loaded = new Promise(function (resolve, reject) {
    const loader = new GLTFLoader();
    loader.load(
      model,
      async function (loadedModel) {
        resolve(loadedModel);
      },
      function (xhr) {
        const percent = (xhr.loaded / xhr.total) * 100;
        if (percent >= 100) {
          console.log("Model: " + model + " loaded.");
        }
      },
      function (error) {
        console.error(error);
        reject(null);
      }
    );
  });
  return loaded;
}
