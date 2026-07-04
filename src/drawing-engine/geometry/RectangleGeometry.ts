import * as THREE from "three";

export class RectangleGeometry {
  static create(
    start: THREE.Vector3,
    end: THREE.Vector3
  ): THREE.BufferGeometry {
    const p1 = start.clone();

    const p2 = new THREE.Vector3(
      end.x,
      start.y,
      start.z
    );

    const p3 = end.clone();

    const p4 = new THREE.Vector3(
      start.x,
      start.y,
      end.z
    );

    return new THREE.BufferGeometry().setFromPoints([
      p1,
      p2,
      p3,
      p4,
      p1,
    ]);
  }
}