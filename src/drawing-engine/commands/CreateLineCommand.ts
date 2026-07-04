import * as THREE from "three";
import type { Command } from "./Command";

export class CreateLineCommand implements Command {
  private readonly scene: THREE.Scene;
  private readonly line: THREE.Line;

  constructor(scene: THREE.Scene, line: THREE.Line) {
    this.scene = scene;
    this.line = line;
  }

  execute(): void {
    this.scene.add(this.line);
  }

  undo(): void {
    this.scene.remove(this.line);
  }
}
