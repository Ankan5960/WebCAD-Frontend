import type { ViewMode } from "../store/viewMode.store";
import { useEffect } from "react";
import type { OrbitControls } from "three/examples/jsm/Addons.js";

export const useViewMode = (
  perspControlsRef: React.RefObject<OrbitControls | null>,
  orthoControlsRef: React.RefObject<OrbitControls | null>,
  mode: ViewMode
) => {

  useEffect(() => {
      if (perspControlsRef.current) {
        perspControlsRef.current.enabled = mode === "3d";
      }
      if (orthoControlsRef.current) {
        orthoControlsRef.current.enabled = mode === "2d";
      }
    }, [mode]);
};