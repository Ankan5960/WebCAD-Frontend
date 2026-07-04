import { Tool } from "./Tool";

export class ToolManager {
  private activeTool: Tool | null = null;

  /**
   * Activate a tool.
   */
  setTool(tool: Tool | null): void {
    if (this.activeTool) {
      this.activeTool.disable();
    }

    this.activeTool = tool;

    if (this.activeTool) {
      this.activeTool.enable();
    }
  }

  /**
   * Returns the current active tool.
   */
  getTool(): Tool | null {
    return this.activeTool;
  }

  /**
   * Remove current tool.
   */
  clear(): void {
    this.setTool(null);
  }
}