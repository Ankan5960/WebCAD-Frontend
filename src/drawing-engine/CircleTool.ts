import * as THREE from "three";
import { DrawTool } from "./DrawTool";

export class CircleTool extends DrawTool {
  private previewCircle: THREE.Line | null = null;

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
      // create dashed circle preview (initially radius 0)
      const geometry = this.createCircleGeometry(this.points[0], 0, 64);
      const material = new THREE.LineDashedMaterial({
        color: 0xffff00,
        dashSize: 0.2,
        gapSize: 0.1,
      });

      this.previewCircle = new THREE.Line(geometry, material);
      this.previewCircle.computeLineDistances();
      this.scene.add(this.previewCircle);
    }

    if (this.points.length === 2) {
      const [center, edge] = this.points;
      const radius = center.distanceTo(edge);

      // finalize permanent circle
      const geometry = this.createCircleGeometry(center, radius, 64);
      const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
      const circle = new THREE.Line(geometry, material);
      this.scene.add(circle);

      this.clearPreview();
      this.points = [];
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.points.length === 1 && this.previewCircle) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.plane);

      if (intersects.length > 0) {
        const center = this.points[0];
        const edge = intersects[0].point.clone();
        const radius = center.distanceTo(edge);

        const newGeometry = this.createCircleGeometry(center, radius, 64);
        this.previewCircle.geometry.dispose();
        this.previewCircle.geometry = newGeometry;
        this.previewCircle.computeLineDistances();
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

  private createCircleGeometry(center: THREE.Vector3, radius: number, segments: number): THREE.BufferGeometry {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          center.x + radius * Math.cos(theta),
          center.y,
          center.z + radius * Math.sin(theta)
        )
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  private clearPreview() {
    if (this.previewCircle) {
      this.scene.remove(this.previewCircle);
      this.previewCircle.geometry.dispose();
      (this.previewCircle.material as THREE.Material).dispose();
      this.previewCircle = null;
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
