import * as THREE from "three";

export const createAxes = (scene: THREE.Scene) => {
    const axisLength = 1;
    const headLength = 0.2;
    const headWidth = 0.1;

    // X axis → red
    const xArrow = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0), // direction
        new THREE.Vector3(0, 0, 0), // origin
        axisLength,
        0xff0000, // color
        headLength,
        headWidth,
    );
    scene.add(xArrow);

    // Y axis → green
    const yArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        axisLength,
        0x00ff00,
        headLength,
        headWidth,
    );
    scene.add(yArrow);

    // Z axis → blue
    const zArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        axisLength,
        0x0000ff,
        headLength,
        headWidth,
    );
    scene.add(zArrow);
};
