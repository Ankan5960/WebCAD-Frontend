import React, { useRef } from "react";
import { useDrawingToolStore } from "../store/drawingTool.store";
import { useViewModeStore } from "../store/viewMode.store";

import { useDrawingTool } from "../hooks/useDrawingTool";
import { useViewMode } from "../hooks/useViewMode";
import { useThreeWorld } from "../hooks/useThreeScene";

const ThreeScene: React.FC<any> = ({
  onCameraRotate,
}: {
  onCameraRotate: (rotY: number) => void;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { mode } = useViewModeStore();

  const activeTool = useDrawingToolStore((state) => state.activeTool);

  const world = useThreeWorld(
    mountRef,
    mode,
    onCameraRotate
  );

  useDrawingTool(
    activeTool,
    mode,
    world.sceneRef,
    world.rendererRef,
    world.planeRef,
    world.perspCamRef,
    world.orthoCamRef
  );

  useViewMode(
    world.perspControlsRef,
    world.orthoControlsRef,
    mode
  )

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
