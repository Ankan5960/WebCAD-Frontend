import * as THREE from "three";
import { DrawTool } from "./DrawTool";

export class EraserTool extends DrawTool {
  constructor(
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    scene: THREE.Scene,
    plane: THREE.Mesh
  ) {
    super(renderer, camera, scene, plane);

    this.renderer.domElement.addEventListener("click", this.onLeftClick);
    this.renderer.domElement.addEventListener("contextmenu", this.onRightClick);
  }

  // Handle left click → try erasing object
  private onLeftClick = (event: MouseEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Intersect against all scene objects (except the ground plane)
    const intersects = this.raycaster.intersectObjects(
      this.scene.children.filter(obj => obj !== this.plane), // skip plane
      true
    );

    if (intersects.length > 0) {
      const objectToRemove = intersects[0].object;

      // Safety: don’t delete lights or camera helpers accidentally
      if (
        objectToRemove instanceof THREE.Mesh ||
        objectToRemove instanceof THREE.Line
      ) {
        this.scene.remove(objectToRemove);

        if ((objectToRemove as THREE.Mesh).geometry) {
          (objectToRemove as THREE.Mesh).geometry.dispose();
        }
        if ((objectToRemove as THREE.Mesh).material) {
          const mat = (objectToRemove as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => m.dispose());
          } else {
            mat.dispose();
          }
        }
      }
    }
  };

  // Handle right click → cancel eraser mode
  private onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.disable();
  };

  override disable() {
    super.disable();
    this.renderer.domElement.removeEventListener("click", this.onLeftClick);
    this.renderer.domElement.removeEventListener(
      "contextmenu",
      this.onRightClick
    );
  }

  protected handlePoint(): void {
    // Not used for eraser
  }
}
