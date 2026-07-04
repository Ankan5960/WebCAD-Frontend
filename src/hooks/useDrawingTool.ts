import * as THREE from "three";
import { useEffect, useRef } from "react";

import type { ViewMode } from "../store/viewMode.store";
import type { IDrawingTool } from "../types/DrawingToolTypes";

import { ToolManager } from "../drawing-engine/core/ToolManager";
import { InputController } from "../drawing-engine/core/InputController";
import { ToolFactory } from "../drawing-engine/factory/ToolFactory";
import type { EditorContext } from "../drawing-engine/core/EditorContext";

import { HistoryManager } from "../drawing-engine/managers/HistoryManager";
import { SelectionManager } from "../drawing-engine/managers/SelectionManager";
import { SnapManager } from "../drawing-engine/managers/SnapManager";
import { GridManager } from "../drawing-engine/managers/GridManager";
import { LayerManager } from "../drawing-engine/managers/LayerManager";

export const useDrawingTool = (
  activeTool: IDrawingTool | null,
  mode: ViewMode,
  sceneRef: React.RefObject<THREE.Scene | null>,
  rendererRef: React.RefObject<THREE.WebGLRenderer | null>,
  planeRef: React.RefObject<THREE.Mesh | null>,
  perspCamRef: React.RefObject<THREE.PerspectiveCamera | null>,
  orthoCamRef: React.RefObject<THREE.OrthographicCamera | null>,
) => {
  // Managers (created once)
  const toolManagerRef = useRef(new ToolManager());
  const historyManagerRef = useRef(new HistoryManager());
  const selectionManagerRef = useRef(new SelectionManager());
  const snapManagerRef = useRef(new SnapManager());
  const gridManagerRef = useRef(new GridManager());
  const layerManagerRef = useRef(new LayerManager());

  const inputControllerRef = useRef<InputController | null>(null);

  /**
   * Initialize InputController only once.
   */
  useEffect(() => {
    const renderer = rendererRef.current;

    if (!renderer) return;

    inputControllerRef.current = new InputController(
      renderer.domElement,
      toolManagerRef.current
    );

    inputControllerRef.current.enable();

    return () => {
      inputControllerRef.current?.disable();
    };
  }, []);

  /**
   * Change active tool.
   */
  useEffect(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const plane = planeRef.current;

    const camera =
      mode === "3d"
        ? perspCamRef.current
        : orthoCamRef.current;

    if (
      !renderer ||
      !scene ||
      !plane ||
      !camera
    ) {
      toolManagerRef.current.clear();
      return;
    }

    const context: EditorContext = {
      renderer,
      camera,
      scene,
      plane,

      history: historyManagerRef.current,
      selection: selectionManagerRef.current,
      snap: snapManagerRef.current,
      grid: gridManagerRef.current,
      layers: layerManagerRef.current,
    };

    const tool = activeTool
      ? ToolFactory.create(activeTool.id, context)
      : null;

    toolManagerRef.current.setTool(tool);

    return () => {
      toolManagerRef.current.clear();
    };
  }, [activeTool, mode]);
};