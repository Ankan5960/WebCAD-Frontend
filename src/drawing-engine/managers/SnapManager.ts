import * as THREE from "three";

export class SnapManager {
  enabled = true;

  gridSize = 1;

  snap(point: THREE.Vector3): THREE.Vector3 {
    if (!this.enabled) return point.clone();

    return new THREE.Vector3(
      Math.round(point.x / this.gridSize) * this.gridSize,
      Math.round(point.y / this.gridSize) * this.gridSize,
      Math.round(point.z / this.gridSize) * this.gridSize
    );
  }
}