import * as THREE from "three";
import { Tool } from "./Tool";
import { RaycastService } from "./RaycastService";
import type { EditorContext } from "./EditorContext";

export abstract class DrawTool extends Tool {
  protected readonly plane: THREE.Mesh;
  protected readonly raycast: RaycastService;

  /**
   * Stores all clicked points while drawing.
   */
  protected readonly points: THREE.Vector3[] = [];

  constructor(context: EditorContext) {
    super(context);
    this.plane = context.plane;
    this.raycast = new RaycastService(context.renderer, context.camera);
  }

  /**
   * Returns the current mouse position on the drawing plane.
   */
  protected getPoint(event: MouseEvent): THREE.Vector3 | null {
    return this.raycast.getPointOnPlane(event, this.plane);
  }

  /**
   * Save a drawing point.
   */
  protected addPoint(point: THREE.Vector3): void {
    this.points.push(point.clone());
  }

  /**
   * Remove every stored point.
   */
  protected clearPoints(): void {
    this.points.length = 0;
  }

  /**
   * Returns the latest point.
   */
  protected get lastPoint(): THREE.Vector3 | undefined {
    return this.points[this.points.length - 1];
  }

  /**
   * Returns number of clicked points.
   */
  protected get pointCount(): number {
    return this.points.length;
  }

  /**
   * Called when drawing is cancelled.
   */
  protected cancelDrawing(): void {
    this.clearPoints();
  }

  /**
   * Called when drawing is finished.
   */
  protected finishDrawing(): void {
    this.clearPoints();
  }
}
