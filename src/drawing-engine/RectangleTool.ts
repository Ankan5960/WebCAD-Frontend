import * as THREE from "three";
import { DrawTool } from "./DrawTool";

export class RectangleTool extends DrawTool {
  private previewRect: THREE.Line | null = null;

  constructor(
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    scene: THREE.Scene,
    plane: THREE.Mesh
  ) {
    super(renderer, camera, scene, plane);

    this.renderer.domElement.addEventListener("mousemove", this.onMouseMove);
    this.renderer.domElement.addEventListener("contextmenu", this.onRightClick);
  }

  protected handlePoint(): void {
    if (this.points.length === 1) {
      // start preview rectangle (just a placeholder until mouse moves)
      const geometry = new THREE.BufferGeometry().setFromPoints([
        this.points[0],
        this.points[0],
      ]);
      const material = new THREE.LineDashedMaterial({
        color: 0x00ff00,
        dashSize: 0.2,
        gapSize: 0.1,
      });

      this.previewRect = new THREE.Line(geometry, material);
      this.previewRect.computeLineDistances();
      this.scene.add(this.previewRect);
    }

    if (this.points.length === 2) {
      // finalize rectangle from two diagonal points
      const [p1, p2] = this.points;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(p1.x, 0, p1.z),
        new THREE.Vector3(p2.x, 0, p1.z),
        new THREE.Vector3(p2.x, 0, p2.z),
        new THREE.Vector3(p1.x, 0, p2.z),
        new THREE.Vector3(p1.x, 0, p1.z),
      ]);
      const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const rectangle = new THREE.Line(geometry, material);
      this.scene.add(rectangle);

      this.clearPreview();
      this.points = []; // reset for next rectangle
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.points.length === 1 && this.previewRect) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.plane);

      if (intersects.length > 0) {
        const p1 = this.points[0];
        const p2 = intersects[0].point.clone();

        const newGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(p1.x, 0, p1.z),
          new THREE.Vector3(p2.x, 0, p1.z),
          new THREE.Vector3(p2.x, 0, p2.z),
          new THREE.Vector3(p1.x, 0, p2.z),
          new THREE.Vector3(p1.x, 0, p1.z),
        ]);

        this.previewRect.geometry.dispose();
        this.previewRect.geometry = newGeometry;
        this.previewRect.computeLineDistances();
      }
    }
  };

  private onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    if (this.points.length === 1) {
      this.points = [];
      this.clearPreview();
    }
  };

  private clearPreview() {
    if (this.previewRect) {
      this.scene.remove(this.previewRect);
      this.previewRect.geometry.dispose();
      (this.previewRect.material as THREE.Material).dispose();
      this.previewRect = null;
    }
  }

  override disable() {
    super.disable();
    this.renderer.domElement.removeEventListener("mousemove", this.onMouseMove);
    this.renderer.domElement.removeEventListener("contextmenu", this.onRightClick);

    this.clearPreview();
    this.points = [];
  }
}
