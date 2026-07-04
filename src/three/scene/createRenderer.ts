import * as THREE from "three";

export const createRenderer = ( width: number, height: number, mount: HTMLDivElement) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    return renderer;
};
