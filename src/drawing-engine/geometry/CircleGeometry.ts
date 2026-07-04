import * as THREE from "three";

export class CircleGeometry {
  static create(
    center: THREE.Vector3,
    radius: number,
    segments = 64
  ): THREE.BufferGeometry {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;

      points.push(
        new THREE.Vector3(
          center.x + radius * Math.cos(theta),
          center.y,
          center.z + radius * Math.sin(theta)
        )
      );
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }
}