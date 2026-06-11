import * as THREE from "three";
import type { ViewMode } from "../store/viewMode.store";
import type { IDrawingTool } from "../types/DrawingToolTypes";
import { useEffect, useRef } from "react";
import type { DrawTool } from "../drawing-engine/DrawTool";
import { createTool } from "../three/ToolFactory";

export const useDrawingTool = (
  activeTool: IDrawingTool | null,
  mode: ViewMode,
  sceneRef: React.RefObject<THREE.Scene | null>,
  rendererRef: React.RefObject<THREE.WebGLRenderer | null>,
  planeRef: React.RefObject<THREE.Mesh | null>,
  perspCamRef: React.RefObject<THREE.PerspectiveCamera | null>,
  orthoCamRef: React.RefObject<THREE.OrthographicCamera | null>
) => {
  const toolRef = useRef<DrawTool | null>(null);

  useEffect(() => {
    toolRef.current?.disable();

    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const plane = planeRef.current;

    const camera =
      mode === "3d"
        ? perspCamRef.current
        : orthoCamRef.current;

    if (!scene || !renderer || !plane || !camera) return;

    toolRef.current = createTool(
      activeTool?.id,
      renderer,
      camera,
      scene,
      plane
    );

    toolRef.current?.enable();

    return () => {
      toolRef.current?.disable();
    };
  }, [activeTool, mode]);
};