import * as THREE from "three";
import type { Command } from "./Command";

export class MoveCommand implements Command {
  private readonly object: THREE.Object3D;
  private readonly from: THREE.Vector3;
  private readonly to: THREE.Vector3;

  constructor(object: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3) {
    this.object = object;
    this.from = from.clone();
    this.to = to.clone();
  }

  execute(): void {
    this.object.position.copy(this.to);
  }

  undo(): void {
    this.object.position.copy(this.from);
  }
}
