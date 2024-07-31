import WebGL from "three/addons/capabilities/WebGL.js";
import { default as playground } from "/src/init.js";
import { createMeshBox, createLineBox, createLineRectangle, createLineCircle } from "/src/util.js";

if (WebGL.isWebGL2Available()) {
  document.body.appendChild(playground.renderer.domElement);
  const meshBox = createMeshBox({
    width: 2,
    height: 3,
    depth: 4,
    color: 0xffcc99,
  });
  const lineBox = createLineBox({
    width: 5,
    height: 5,
    depth: 5,
    color: 0xcc99ff,
  });
  const lineRectangle = createLineRectangle({
    width: 10,
    length: 10,
    color: 0x99ffcc,
  })
  const lineCircle = createLineCircle({
    radius: 10,
    segment: 16,
    color: 0xff99cc,
  })
  playground.scene.add(meshBox);
  playground.scene.add(lineBox);
  playground.scene.add(lineRectangle);
  playground.scene.add(lineCircle);
  playground.renderer.setAnimationLoop(() => {
    meshBox.rotation.x -= 0.05;
    meshBox.rotation.y += 0.05;
    meshBox.rotation.z -= 0.05;
    lineBox.rotation.x += 0.1;
    lineBox.rotation.y -= 0.1;
    lineBox.rotation.z += 0.1;
    lineRectangle.rotation.z -= 0.025;
    lineCircle.rotation.z -= 0.025;
    if (playground.camera.position.z <= 100) {
      playground.camera.position.z += 0.25;
    }
    playground.renderer.render(playground.scene, playground.camera);
  });
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
