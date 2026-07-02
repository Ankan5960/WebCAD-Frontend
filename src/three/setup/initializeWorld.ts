import { createOrthographicCamera } from "../camera/createOrthographicCamera";
import { createPerspectiveCamera } from "../camera/createPerspectiveCamera";
import { createOrbitControls } from "../controls/createOrbitControls";
import { createOrthographicControls } from "../controls/createOrthographicControls";
import { createAxes } from "../scene/createAxes";
import { createGroundPlane } from "../scene/createGroundPlane";
import { createLights } from "../scene/createLights";
import { createRenderer } from "../scene/createRenderer";
import { createScene } from "../scene/createScene";


export function initializeWorld(
    mount: HTMLDivElement,
    width: number,
    height: number,
    orthoSize: number
) {
    const scene = createScene();
    const perspCam = createPerspectiveCamera(width, height);
    const orthoCam = createOrthographicCamera(width, height, orthoSize);
    const renderer = createRenderer(width, height, mount);

    createLights(scene);
    createAxes(scene);

    const plane = createGroundPlane(scene);

    const perspControls = createOrbitControls(perspCam, renderer);
    const orthoControls = createOrthographicControls(orthoCam, renderer);

    return {
        scene,
        renderer,
        plane,
        perspCam,
        orthoCam,
        perspControls,
        orthoControls
    };
}