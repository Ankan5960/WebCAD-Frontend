import * as THREE from "three";
import { PreviewObject } from "./PreviewObject";

export class CirclePreview extends PreviewObject<THREE.Line> {
  protected createObject(): THREE.Line {
    const geometry = new THREE.BufferGeometry();

    const material = new THREE.LineDashedMaterial({
      color: 0xffff00,
      dashSize: 0.2,
      gapSize: 0.1,
    });

    return new THREE.Line(geometry, material);
  }

  update(geometry: THREE.BufferGeometry): void {
    this.show();

    if (!this.object) return;

    this.object.geometry.dispose();
    this.object.geometry = geometry;

    this.object.computeLineDistances();
  }
}