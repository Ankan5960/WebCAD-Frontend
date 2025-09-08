// stores/viewModeStore.ts
import { create } from "zustand";

export type ViewMode = "2d" | "3d";

interface IViewModeState {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<IViewModeState>((set, get) => ({
  mode: "3d",
  toggleMode: () =>
    set({ mode: get().mode === "3d" ? "2d" : "3d" }),
  setMode: (mode) => set({ mode }),
}));
