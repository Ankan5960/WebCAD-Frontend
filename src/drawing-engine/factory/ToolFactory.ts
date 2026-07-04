import { Tool } from "../core/Tool";
import { LineTool } from "../tools/LineTool";
import { CircleTool } from "../tools/CircleTool";
import { RectangleTool } from "../tools/RectangleTool";
import { EraserTool } from "../tools/EraserTool";
import type { ToolId } from "../../types/DrawingToolTypes";
import type { EditorContext } from "../core/EditorContext";

type ToolConstructor = new (context: EditorContext) => Tool;

export class ToolFactory {
  private static readonly registry: Partial<Record<ToolId, ToolConstructor>> = {
    line: LineTool,
    rectangle: RectangleTool,
    circle: CircleTool,
    eraser: EraserTool,
  };

  static create(toolId: ToolId, context: EditorContext): Tool | null {
    const ToolClass = this.registry[toolId];

    if (!ToolClass) {
      return null;
    }

    return new ToolClass(context);
  }

  static register(toolId: ToolId, tool: ToolConstructor): void {
    this.registry[toolId] = tool;
  }
}
