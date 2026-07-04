import * as THREE from "three";

export class GridManager {
  readonly grid: THREE.GridHelper;

  constructor(
    size = 100,
    divisions = 100
  ) {
    this.grid = new THREE.GridHelper(size, divisions);
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.grid);
  }

  removeFrom(scene: THREE.Scene): void {
    scene.remove(this.grid);
  }

  show(): void {
    this.grid.visible = true;
  }

  hide(): void {
    this.grid.visible = false;
  }

  toggle(): void {
    this.grid.visible = !this.grid.visible;
  }
}