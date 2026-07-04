import * as THREE from "three";

export class RaycastService {
  private readonly raycaster = new THREE.Raycaster();
  private readonly mouse = new THREE.Vector2();
  private readonly renderer: THREE.WebGLRenderer;
  private readonly camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor(
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  ) {
    this.renderer = renderer;
    this.camera = camera;
  }

  /**
   * Convert mouse event into normalized device coordinates.
   */
  private updateMouse(event: MouseEvent): void {
    console.log("Renderer:", this.renderer);
    console.log("DomElement:", this.renderer?.domElement);
    const rect = this.renderer.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  /**
   * Returns all intersections with an object.
   */
  intersectObject(
    event: MouseEvent,
    object: THREE.Object3D,
    recursive = false,
  ): THREE.Intersection[] {
    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    return this.raycaster.intersectObject(object, recursive);
  }

  /**
   * Returns all intersections with multiple objects.
   */
  intersectObjects(
    event: MouseEvent,
    objects: THREE.Object3D[],
    recursive = false,
  ): THREE.Intersection[] {
    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    return this.raycaster.intersectObjects(objects, recursive);
  }

  /**
   * Returns the clicked point on a plane (or any mesh).
   */
  getPointOnPlane(
    event: MouseEvent,
    plane: THREE.Object3D,
  ): THREE.Vector3 | null {
    const intersects = this.intersectObject(event, plane);

    if (intersects.length === 0) {
      return null;
    }

    return intersects[0].point.clone();
  }
}
