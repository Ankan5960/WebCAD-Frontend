import * as THREE from "three";
import { LineTool } from "../drawing-engine/LineTool";
import { RectangleTool } from "../drawing-engine/RectangleTool";
import { CircleTool } from "../drawing-engine/CircleTool";
import { EraserTool } from "../drawing-engine/EraserTool ";
import type { ToolId } from "../types/DrawingToolTypes";

export function createTool(
  toolId: ToolId | undefined,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  scene: THREE.Scene,
  plane: THREE.Mesh
) {
  switch (toolId) {
    case "line":
      return new LineTool(renderer, camera, scene, plane);

    case "rectangle":
      return new RectangleTool(renderer, camera, scene, plane);

    case "circle":
      return new CircleTool(renderer, camera, scene, plane);

    case "eraser":
      return new EraserTool(renderer, camera, scene, plane);

    default:
      return null;
  }
}