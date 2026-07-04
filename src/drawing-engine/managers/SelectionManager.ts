import * as THREE from "three";

export class SelectionManager {
  private selected = new Set<THREE.Object3D>();

  select(object: THREE.Object3D): void {
    this.selected.add(object);
  }

  deselect(object: THREE.Object3D): void {
    this.selected.delete(object);
  }

  clear(): void {
    this.selected.clear();
  }

  toggle(object: THREE.Object3D): void {
    if (this.selected.has(object))
      this.selected.delete(object);
    else
      this.selected.add(object);
  }

  isSelected(object: THREE.Object3D): boolean {
    return this.selected.has(object);
  }

  get selection(): THREE.Object3D[] {
    return [...this.selected];
  }
}