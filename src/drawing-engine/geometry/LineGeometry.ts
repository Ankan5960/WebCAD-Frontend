import * as THREE from "three";

export class LineGeometry {
  /**
   * Creates a line geometry from two or more points.
   */
  static create(points: THREE.Vector3[]): THREE.BufferGeometry {
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  /**
   * Creates a geometry from exactly two points.
   */
  static createBetween(
    start: THREE.Vector3,
    end: THREE.Vector3
  ): THREE.BufferGeometry {
    return this.create([start, end]);
  }
}