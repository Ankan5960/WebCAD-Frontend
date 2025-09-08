import { create } from "zustand";

export type ToolType = "line" | "rectangle" | "circle" | "eraser" | null;

interface IDrawingToolState {
  activeTool: ToolType;
  setTool: (tool: ToolType) => void;
}

export const useDrawingToolStore = create<IDrawingToolState>((set) => ({
  activeTool: null,
  setTool: (tool) => {
    set({ activeTool: tool });
  },
}));
