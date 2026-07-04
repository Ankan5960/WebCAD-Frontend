import { ToolManager } from "./ToolManager";

export class InputController {
  private readonly element: HTMLElement;
  private readonly toolManager: ToolManager;

  constructor(element: HTMLElement, toolManager: ToolManager) {
    this.element = element;
    this.toolManager = toolManager;
  }

  enable(): void {
    this.element.addEventListener("mousedown", this.onMouseDown);
    this.element.addEventListener("mousemove", this.onMouseMove);
    this.element.addEventListener("mouseup", this.onMouseUp);
    this.element.addEventListener("contextmenu", this.onRightClick);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  disable(): void {
    this.element.removeEventListener("mousedown", this.onMouseDown);
    this.element.removeEventListener("mousemove", this.onMouseMove);
    this.element.removeEventListener("mouseup", this.onMouseUp);
    this.element.removeEventListener("contextmenu", this.onRightClick);

    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  private onMouseDown = (event: MouseEvent) => {
    this.toolManager.getTool()?.onMouseDown(event);
  };

  private onMouseMove = (event: MouseEvent) => {
    this.toolManager.getTool()?.onMouseMove(event);
  };

  private onMouseUp = (event: MouseEvent) => {
    this.toolManager.getTool()?.onMouseUp(event);
  };

  private onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.toolManager.getTool()?.onRightClick(event);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    this.toolManager.getTool()?.onKeyDown(event);
  };

  private onKeyUp = (event: KeyboardEvent) => {
    this.toolManager.getTool()?.onKeyUp(event);
  };
}