import WebGL from "three/addons/capabilities/WebGL.js";
import { default as playground } from "/src/init.mjs";
import {
  createMeshBox,
  createLineBox,
  createLineRectangle,
  createLineCircle,
  createLineTriangle,
  createText,
} from "/src/util.mjs";

if (WebGL.isWebGL2Available()) {
  document.body.appendChild(playground.renderer.domElement);
  const meshBox = createMeshBox({
    width: 10,
    height: 20,
    depth: 30,
    color: 0xffcc99,
  });
  const lineBox = createLineBox({
    width: 50,
    height: 50,
    depth: 50,
    color: 0xcc99ff,
  });
  const lineRectangle = createLineRectangle({
    width: 100,
    length: 100,
    color: 0x99ffcc,
  });
  const lineCircle = createLineCircle({
    radius: 20,
    segment: 32,
    color: 0xff99cc,
  });
  const lineTriangle = createLineTriangle({
    length: 100,
    color: 0xccff99,
  });
  const text = createText({
    text: "Playground",
    size: 80,
    color: 0xff99cc,
    scene: playground.scene,
  });
  playground.scene.add(meshBox);
  playground.scene.add(lineBox);
  playground.scene.add(lineRectangle);
  playground.scene.add(lineCircle);
  playground.scene.add(lineTriangle);
  playground.renderer.setAnimationLoop(() => {
    meshBox.rotation.x -= 0.2;
    meshBox.rotation.y += 0.2;
    meshBox.rotation.z -= 0.2;
    lineBox.rotation.x += 0.05;
    lineBox.rotation.y -= 0.05;
    lineBox.rotation.z += 0.05;
    lineRectangle.rotation.z -= 0.025;
    lineCircle.rotation.z -= 0.025;
    lineTriangle.rotation.x -= 0.05;
    lineTriangle.rotation.y -= 0.05;
    lineTriangle.rotation.z -= 0.05;
    if (playground.camera.position.z <= 1000) {
      playground.camera.position.z += 1;
    }
    playground.renderer.render(playground.scene, playground.camera);
  });
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
