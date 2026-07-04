import * as THREE from "three";
import { Tool } from "../core/Tool";
import { RaycastService } from "../core/RaycastService";
import { SceneFactory } from "../core/SceneFactory";

export class EraserTool extends Tool {

  private readonly raycast = new RaycastService(
    this.renderer,
    this.camera
  );

  override onMouseDown(event: MouseEvent): void {

    const hits = this.raycast.intersectObjects(
      event,
      this.scene.children.filter(
        obj => !(obj instanceof THREE.Mesh)
      ),
      true
    );

    if (!hits.length) return;

    SceneFactory.removeObject(
      this.scene,
      hits[0].object
    );

  }

}