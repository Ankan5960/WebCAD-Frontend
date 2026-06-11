import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";


export const createOrthographicControls = (orthoCam: THREE.OrthographicCamera, renderer: THREE.WebGLRenderer) => {
    const orthoControls = new OrbitControls(orthoCam, renderer.domElement);
    orthoControls.enableRotate = false;
    orthoControls.enablePan = true;
    orthoControls.enableZoom = true;

    return orthoControls;
}