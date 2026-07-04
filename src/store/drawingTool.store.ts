import { create } from "zustand";
import { type IDrawingTool} from "../types/DrawingToolTypes";

interface IDrawingToolState {
  activeTool: IDrawingTool | null;
  setTool: (tool: IDrawingTool | null) => void;
}

export const useDrawingToolStore = create<IDrawingToolState>((set) => ({
  activeTool: null,
  setTool: (tool) => {
    set({ activeTool: tool });
  },
}));
