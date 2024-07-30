import WebGL from "three/addons/capabilities/WebGL.js";
import { init } from "/src/init.js";

// @ https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check
if (WebGL.isWebGL2Available()) {
  init();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
