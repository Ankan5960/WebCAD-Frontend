import * as THREE from "three";

import { HistoryManager } from "../managers/HistoryManager";
import { SelectionManager } from "../managers/SelectionManager";
import { SnapManager } from "../managers/SnapManager";
import { GridManager } from "../managers/GridManager";
import { LayerManager } from "../managers/LayerManager";

export interface EditorContext {
  renderer: THREE.WebGLRenderer;

  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  scene: THREE.Scene;

  plane: THREE.Mesh;

  history: HistoryManager;

  selection: SelectionManager;

  snap: SnapManager;

  grid: GridManager;

  layers: LayerManager;
}