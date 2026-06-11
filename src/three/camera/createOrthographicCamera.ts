import * as THREE from "three";

export const createOrthographicCamera = (width: number, height: number, orthoSize: number) => {
    const aspect = width / height;
    const orthoCam = new THREE.OrthographicCamera(
        -orthoSize * aspect,
        orthoSize * aspect,
        orthoSize,
        -orthoSize,
        0.1,
        1000,
    );
    orthoCam.position.set(0, 50, 0);
    orthoCam.up.set(0, 0, -1); // so Z axis points up in 2D
    orthoCam.lookAt(0, 0, 0);

    return orthoCam;
};