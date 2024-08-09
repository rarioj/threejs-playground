import WebGL from "three/addons/capabilities/WebGL.js";
import { start } from "./start.js";

// https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check
if (WebGL.isWebGL2Available()) {
  start();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
