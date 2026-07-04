import * as THREE from "three";
import { DrawTool } from "../core/DrawTool";

export abstract class TwoPointDrawTool extends DrawTool {
  override onMouseDown(event: MouseEvent): void {
    const point = this.getPoint(event);

    if (!point) return;

    this.addPoint(point);

    switch (this.pointCount) {
      case 1:
        this.onFirstPoint(point);
        break;

      case 2:
        this.onSecondPoint(this.points[0], this.points[1]);
        this.finishDrawing();
        break;
    }
  }

  override onMouseMove(event: MouseEvent): void {
    if (this.pointCount !== 1) return;

    const point = this.getPoint(event);

    if (!point) return;

    this.onPreview(this.points[0], point);
  }

  override onRightClick(event: MouseEvent): void {
    event.preventDefault();

    this.onCancel();

    this.cancelDrawing();
  }

  protected override finishDrawing(): void {
    super.finishDrawing();

    this.onFinish();
  }

  protected abstract onFirstPoint(point: THREE.Vector3): void;

  protected abstract onSecondPoint(
    start: THREE.Vector3,
    end: THREE.Vector3,
  ): void;

  protected abstract onPreview(
    start: THREE.Vector3,
    current: THREE.Vector3,
  ): void;

  protected onCancel(): void {}

  protected onFinish(): void {}
}
