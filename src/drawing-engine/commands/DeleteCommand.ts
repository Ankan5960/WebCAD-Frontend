import * as THREE from "three";
import type { Command } from "./Command";

export class DeleteCommand implements Command {
  private readonly scene: THREE.Scene;
  private readonly object: THREE.Object3D;

  constructor(scene: THREE.Scene, object: THREE.Object3D) {
    this.scene = scene;
    this.object = object;
  }

  execute(): void {
    this.scene.remove(this.object);
  }

  undo(): void {
    this.scene.add(this.object);
  }
}
