import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { OrbitControls } from "three/examples/jsm/Addons.js";
import { createScene } from "../three/scene/createScene";
import { createPerspectiveCamera } from "../three/camera/createPerspectiveCamera";
import { createOrthographicCamera } from "../three/camera/createOrthographicCamera";
import { createRenderer } from "../three/scene/createRenderer";
import { createLights } from "../three/scene/createLights";
import { createAxes } from "../three/scene/createAxes";
import { createGroundPlane } from "../three/scene/createGroundPlane";
import { createOrbitControls } from "../three/controls/createOrbitControls";
import { createOrthographicControls } from "../three/controls/createOrthographicControls";
import type { ViewMode } from "../store/viewMode.store";

export const useThreeWorld = (
    mountRef: React.RefObject<HTMLDivElement | null>,
    mode: ViewMode,
    onCameraRotate: (rotY: number) => void
) => {

    const sceneRef = useRef<THREE.Scene | null>(null);
    const perspCamRef = useRef<THREE.PerspectiveCamera | null>(null);
    const orthoCamRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const planeRef = useRef<THREE.Mesh | null>(null);
    const perspControlsRef = useRef<OrbitControls | null>(null);
    const orthoControlsRef = useRef<OrbitControls | null>(null);
    useEffect(() => {
        const mount = mountRef.current!;
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        const orthoSize = 20;

        // Scene
        const scene = createScene();
        sceneRef.current = scene;

        // Perspective Camera (for 3D)
        const perspCam = createPerspectiveCamera(width, height);
        perspCamRef.current = perspCam;

        // Orthographic Camera (for 2D top view)
        const orthoCam = createOrthographicCamera(width, height, orthoSize);
        orthoCamRef.current = orthoCam;

        // Renderer
        const renderer = createRenderer(width, height, mount);
        rendererRef.current = renderer;

        // Lights
        createLights(scene);

        // Axes Helper
        createAxes(scene);

        // Ground plane
        const plane = createGroundPlane(scene);
        planeRef.current = plane;

        // Orbit Controls (only for perspective)
        const perspControls = createOrbitControls(perspCam, renderer);
        perspControlsRef.current = perspControls;

        // Orthographic controls
        const orthoControls = createOrthographicControls(orthoCam, renderer);
        orthoControlsRef.current = orthoControls;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (mode === "3d") {
                perspControlsRef.current?.update();
                renderer.render(scene, perspCam);
                onCameraRotate(perspCam.rotation.y);
            } else {
                orthoControlsRef.current?.update();
                renderer.render(scene, orthoCam);
                onCameraRotate(orthoCam.rotation.y);
            }
        };
        animate();

        // Handle resize
        const handleResize = () => {
            const { clientWidth, clientHeight } = mount;

            // Perspective
            perspCam.aspect = clientWidth / clientHeight;
            perspCam.updateProjectionMatrix();

            // Orthographic
            const aspectR = clientWidth / clientHeight;
            orthoCam.left = -orthoSize * aspectR;
            orthoCam.right = orthoSize * aspectR;
            orthoCam.top = orthoSize;
            orthoCam.bottom = -orthoSize;
            orthoCam.updateProjectionMatrix();

            renderer.setSize(clientWidth, clientHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            mount.removeChild(renderer.domElement);
        };
    }, [onCameraRotate, mode]);

    return {
        sceneRef,
        rendererRef,
        planeRef,
        perspCamRef,
        orthoCamRef,
        perspControlsRef,
        orthoControlsRef
    }
}