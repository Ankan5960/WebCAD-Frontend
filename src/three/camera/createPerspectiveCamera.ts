import * as THREE from "three";

export const createPerspectiveCamera = (width: number, height: number) => {
    const perspCam = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    perspCam.position.set(5, 5, 5);

    return perspCam;
};