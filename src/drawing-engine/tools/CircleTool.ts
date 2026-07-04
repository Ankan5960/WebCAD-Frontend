import * as THREE from "three";
import { CircleGeometry } from "../geometry/CircleGeometry";
import { CirclePreview } from "../preview/CirclePreview";
import { TwoPointDrawTool } from "../core/TwoPointDrawTool";

export class CircleTool extends TwoPointDrawTool {
  private preview = new CirclePreview(this.scene);

  protected onFirstPoint(): void {
    this.preview.show();
  }

  protected onPreview(center: THREE.Vector3, edge: THREE.Vector3): void {
    const radius = center.distanceTo(edge);

    this.preview.update(CircleGeometry.create(center, radius));
  }

  protected onSecondPoint(center: THREE.Vector3, edge: THREE.Vector3): void {
    const radius = center.distanceTo(edge);

    const geometry = CircleGeometry.create(center, radius);

    const material = new THREE.LineBasicMaterial({
      color: 0xffff00,
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
