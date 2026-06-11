import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const createOrbitControls = (perspCam: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    const perspControls = new OrbitControls(perspCam, renderer.domElement);
    perspControls.enableDamping = true;
    perspControls.dampingFactor = 0.05;
    perspControls.screenSpacePanning = true; // ✅ allow panning
    perspControls.enablePan = true;
    perspControls.minDistance = 2;
    perspControls.maxDistance = 50;
    perspControls.maxPolarAngle = Math.PI / 2;
    
    return perspControls;
}