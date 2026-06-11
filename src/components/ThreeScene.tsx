import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { useDrawingToolStore } from "../store/drawingTool.store";
import { DrawTool } from "../drawing-engine/DrawTool";
import { useViewModeStore } from "../store/viewMode.store";
import { createAxes } from "../three/scene/createAxes";
import { createScene } from "../three/scene/createScene";
import { createTool } from "../three/ToolFactory";
import { createLights } from "../three/scene/createLights";
import { createRenderer } from "../three/scene/createRenderer";
import { createGroundPlane } from "../three/scene/createGroundPlane";
import { createPerspectiveCamera } from "../three/camera/createPerspectiveCamera";
import { createOrthographicCamera } from "../three/camera/createOrthographicCamera";
import { createOrbitControls } from "../three/controls/createOrbitControls";
import { createOrthographicControls } from "../three/controls/createOrthographicControls";

const ThreeScene: React.FC<any> = ({
  onCameraRotate,
}: {
  onCameraRotate: (rotY: number) => void;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { mode } = useViewModeStore();

  const activeTool = useDrawingToolStore((state) => state.activeTool);
  const toolRef = useRef<DrawTool | null>(null);

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

  useEffect(() => {
    toolRef.current?.disable();

    const scene = sceneRef.current;
    const camera = mode === "3d" ? perspCamRef.current : orthoCamRef.current;
    const renderer = rendererRef.current;
    const plane = planeRef.current;

    if (!renderer || !scene || !camera || !plane) return;

    toolRef.current = createTool(
      activeTool?.id,
      renderer,
      camera,
      scene,
      plane
    );

    toolRef.current?.enable();
  }, [activeTool, mode]);

  useEffect(() => {
    if (perspControlsRef.current) {
      perspControlsRef.current.enabled = mode === "3d";
    }
    if (orthoControlsRef.current) {
      orthoControlsRef.current.enabled = mode === "2d";
    }
  }, [mode]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
