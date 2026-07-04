import * as THREE from "three";

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  objects: THREE.Object3D[];
}

export class LayerManager {
  private layers = new Map<string, Layer>();

  create(id: string, name: string): void {
    this.layers.set(id, {
      id,
      name,
      visible: true,
      objects: [],
    });
  }

  addObject(
    layerId: string,
    object: THREE.Object3D
  ): void {
    this.layers.get(layerId)?.objects.push(object);
  }

  setVisible(
    layerId: string,
    visible: boolean
  ): void {
    const layer = this.layers.get(layerId);

    if (!layer) return;

    layer.visible = visible;

    layer.objects.forEach(obj => {
      obj.visible = visible;
    });
  }

  getLayer(id: string) {
    return this.layers.get(id);
  }

  get all() {
    return [...this.layers.values()];
  }
}