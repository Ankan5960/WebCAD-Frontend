import * as THREE from "three";

export class SceneFactory {
  static createLine(
    points: THREE.Vector3[],
    color = 0xffffff
  ): THREE.Line {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color,
    });

    return new THREE.Line(geometry, material);
  }

  static createDashedLine(
    points: THREE.Vector3[],
    color = 0xffffff
  ): THREE.Line {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.2,
      gapSize: 0.1,
    });

    const line = new THREE.Line(geometry, material);

    line.computeLineDistances();

    return line;
  }

  static disposeObject(object: THREE.Object3D): void {
    object.traverse(child => {
      if ("geometry" in child) {
        (child as THREE.Mesh).geometry?.dispose();
      }

      if ("material" in child) {
        const material = (child as THREE.Mesh).material;

        if (Array.isArray(material)) {
          material.forEach(mat => mat.dispose());
        } else {
          material?.dispose();
        }
      }
    });
  }

  static removeObject(
    scene: THREE.Scene,
    object: THREE.Object3D
  ): void {
    scene.remove(object);
    this.disposeObject(object);
  }
}