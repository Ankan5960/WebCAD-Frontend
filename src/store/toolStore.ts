import { create } from "zustand";

export type ToolType = "line" | "rectangle" | "circle" | "eraser" | null;

interface ToolState {
  activeTool: ToolType;
  setTool: (tool: ToolType) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  activeTool: null,
  setTool: (tool) => {
    set({ activeTool: tool })},
}));
