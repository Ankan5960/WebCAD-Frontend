import * as THREE from "three";
import { RectangleGeometry } from "../geometry/RectangleGeometry";
import { RectanglePreview } from "../preview/RectanglePreview";
import { TwoPointDrawTool } from "../core/TwoPointDrawTool";

export class RectangleTool extends TwoPointDrawTool {
  private preview = new RectanglePreview(this.scene);

  protected onFirstPoint(): void {
    this.preview.show();
  }

  protected onPreview(start: THREE.Vector3, end: THREE.Vector3): void {
    this.preview.update(RectangleGeometry.create(start, end));
  }

  protected onSecondPoint(start: THREE.Vector3, end: THREE.Vector3): void {
    const geometry = RectangleGeometry.create(start, end);

    const material = new THREE.LineBasicMaterial({
      color: 0x00ffff,
    });

    this.scene.add(new THREE.Line(geometry, material));
  }

  protected override onCancel() {
    this.preview.hide();
  }

  protected override onFinish() {
    this.preview.hide();
  }
}
