import * as THREE from "three";
import { LineGeometry } from "../geometry/LineGeometry";
import { LinePreview } from "../preview/LinePreview";
import { SceneFactory } from "../core/SceneFactory";
import { TwoPointDrawTool } from "../core/TwoPointDrawTool";

export class LineTool extends TwoPointDrawTool {
  private preview = new LinePreview(this.scene);

  protected onFirstPoint(): void {
    this.preview.show();
  }

  protected onPreview(start: THREE.Vector3, end: THREE.Vector3): void {
    this.preview.update(LineGeometry.createBetween(start, end));
  }

  protected onSecondPoint(start: THREE.Vector3, end: THREE.Vector3): void {
    const line = SceneFactory.createLine([start, end], 0xff0000);

    this.scene.add(line);
  }

  protected override onCancel(): void {
    this.preview.hide();
  }

  protected override onFinish(): void {
    this.preview.hide();
  }
}
