import * as THREE from "three";

export abstract class DrawTool {
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  protected renderer: THREE.WebGLRenderer;
  protected plane: THREE.Mesh;
  protected raycaster: THREE.Raycaster;
  protected mouse: THREE.Vector2;
  protected points: THREE.Vector3[] = [];

  private handleClick = this.onClick.bind(this);

  constructor(
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    scene: THREE.Scene,
    plane: THREE.Mesh
  ) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.plane = plane;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  enable() {
    this.renderer.domElement.addEventListener("click", this.handleClick);
  }

  disable() {
    this.renderer.domElement.removeEventListener("click", this.handleClick);
  }

  private onClick(event: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.plane);

    if (intersects.length > 0) {
      this.points.push(intersects[0].point.clone());
      this.handlePoint();
    }
  }

  // Abstract method → child must implement
  protected abstract handlePoint(): void;
}
