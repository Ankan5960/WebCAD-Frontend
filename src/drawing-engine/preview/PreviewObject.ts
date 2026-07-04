import * as THREE from "three";

export abstract class PreviewObject<T extends THREE.Object3D = THREE.Object3D> {
  protected readonly scene: THREE.Scene;

  protected object: T | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Create preview object.
   */
  protected abstract createObject(): T;

  /**
   * Returns preview object.
   */
  get instance(): T | null {
    return this.object;
  }

  /**
   * Adds preview to scene.
   */
  show(): void {
    if (this.object) return;

    this.object = this.createObject();
    this.scene.add(this.object);
  }

  /**
   * Removes preview.
   */
  hide(): void {
    if (!this.object) return;

    this.scene.remove(this.object);

    if (this.object instanceof THREE.Mesh) {
      this.object.geometry.dispose();

      const material = this.object.material;
      if (Array.isArray(material)) {
        material.forEach((mat) => mat.dispose());
      } else {
        material.dispose();
      }
    }

    this.object = null;
  }
}
