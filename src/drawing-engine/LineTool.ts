import * as THREE from "three";
import { DrawTool } from "./DrawTool";

export class LineTool extends DrawTool {
  private previewLine: THREE.Line | null = null;

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
      // create a dashed preview line after first click
      const geometry = new THREE.BufferGeometry().setFromPoints([
        this.points[0],
        this.points[0], // placeholder until mouse moves
      ]);
      const material = new THREE.LineDashedMaterial({
        color: 0xffffff,
        dashSize: 0.2,
        gapSize: 0.1,
      });

      this.previewLine = new THREE.Line(geometry, material);
      this.previewLine.computeLineDistances();
      this.scene.add(this.previewLine);
    }

    if (this.points.length === 2) {
      // finalize permanent line
      const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);

      this.clearPreview();
      this.points = []; // reset for next line
    }
  }

  private onRightClick = (event: MouseEvent) => {
    event.preventDefault();

    if (this.points.length === 1) {
      // cancel current drawing
      this.points = [];
      this.clearPreview();
    }
  };

  private clearPreview() {
    if (this.previewLine) {
      this.scene.remove(this.previewLine);
      this.previewLine.geometry.dispose();
      (this.previewLine.material as THREE.Material).dispose();
      this.previewLine = null;
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.points.length === 1 && this.previewLine) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.plane);

      if (intersects.length > 0) {
        const newPoint = intersects[0].point.clone();
        const newGeometry = new THREE.BufferGeometry().setFromPoints([
          this.points[0],
          newPoint,
        ]);
        this.previewLine.geometry.dispose();
        this.previewLine.geometry = newGeometry;
        this.previewLine.computeLineDistances();
      }
    }
  };

  override disable() {
    super.disable();
    this.renderer.domElement.removeEventListener("mousemove", this.onMouseMove);
    if (this.previewLine) {
      this.scene.remove(this.previewLine);
      this.previewLine.geometry.dispose();
      (this.previewLine.material as THREE.Material).dispose();
      this.previewLine = null;
    }
    this.points = [];
  }
}
