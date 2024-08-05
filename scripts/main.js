import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { default as playground } from "/scripts/init.mjs";
import {
  createMeshBox,
  createLineBox,
  createLineRectangle,
  createLineCircle,
  createLineTriangle,
  createText,
  createModel,
} from "/scripts/util.mjs";

if (WebGL.isWebGL2Available()) {
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
    length: 125,
    color: 0xccff99,
  });
  const text = await createText({
    text: "Pack my box with\nfive dozen liquor jugs",
    size: 45,
    color: 0xcccccc,
  });
  const modelIronHide = await createModel({
    model: "rigged_ironhide__transformers_dotm",
  });
  modelIronHide.scale.set(50, 50, 50);
  await playground.renderer.compileAsync(
    modelIronHide,
    playground.camera,
    playground.scene
  );
  /*
  const modelMazda = await createModel({
    model: "mazda_787b",
  });
  modelMazda.scale.set(100, 100, 100);
  await playground.renderer.compileAsync(
    modelMazda,
    playground.camera,
    playground.scene
  );
  */
  const group = new THREE.Group();
  group.add(meshBox);
  group.add(lineBox);
  group.add(lineRectangle);
  group.add(lineCircle);
  group.add(lineTriangle);
  text.position.set(-450, 250, 0);
  group.position.set(250, 250, 0);
  modelIronHide.position.set(-200, -200, 0);
  //modelMazda.position.set(-350, -200, 0);
  playground.scene.add(group);
  playground.scene.add(text);
  playground.scene.add(modelIronHide);
  //playground.scene.add(modelMazda);

  function animate(time) {
    time *= 0.001;
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
    playground.controls.update();
    playground.renderer.render(playground.scene, playground.camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  document.body.appendChild(playground.renderer.domElement);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
