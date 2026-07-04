import * as THREE from "three";
import type { EditorContext } from "./EditorContext";

export abstract class Tool {
  protected readonly renderer: THREE.WebGLRenderer;
  protected readonly camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  protected readonly scene: THREE.Scene;
  protected readonly context: EditorContext;

  constructor(context: EditorContext) {
    this.context = context;

    this.renderer = context.renderer;
    this.camera = context.camera;
    this.scene = context.scene;
  }

  /**
   * Called when this tool becomes active.
   */
  enable(): void {}

  /**
   * Called when another tool replaces this tool.
   */
  disable(): void {}

  /**
   * Mouse Events
   */
  onMouseDown(_event: MouseEvent): void {}

  onMouseMove(_event: MouseEvent): void {}

  onMouseUp(_event: MouseEvent): void {}

  onRightClick(_event: MouseEvent): void {}

  /**
   * Keyboard Events
   */
  onKeyDown(_event: KeyboardEvent): void {}

  onKeyUp(_event: KeyboardEvent): void {}
}
