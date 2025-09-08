import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { LineTool } from "../drawing-engine/LineTool";
import { useDrawingToolStore } from "../store/drawingTool.store";
import { DrawTool } from "../drawing-engine/DrawTool";
import { RectangleTool } from "../drawing-engine/RectangleTool";
import { CircleTool } from "../drawing-engine/CircleTool";
import { useViewModeStore } from "../store/viewMode.store";
import { EraserTool } from "../drawing-engine/EraserTool ";

const ThreeScene = ({
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
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1c22);
    sceneRef.current = scene;

    // Perspective Camera (for 3D)
    const perspCam = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    perspCam.position.set(5, 5, 5);
    perspCamRef.current = perspCam;

    // Orthographic Camera (for 2D top view)
    const aspect = width / height;
    const orthoSize = 20;
    const orthoCam = new THREE.OrthographicCamera(
      -orthoSize * aspect,
      orthoSize * aspect,
      orthoSize,
      -orthoSize,
      0.1,
      1000
    );
    orthoCam.position.set(0, 50, 0);
    orthoCam.up.set(0, 0, -1); // so Z axis points up in 2D
    orthoCam.lookAt(0, 0, 0);
    orthoCamRef.current = orthoCam;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x2d2d2d });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    scene.add(plane);
    planeRef.current = plane;

    // Orbit Controls (only for perspective)
    const controls = new OrbitControls(perspCam, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      const cam = mode === "3d" ? perspCam : orthoCam;
      renderer.render(scene, cam!);
      onCameraRotate(cam!.rotation.y);
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

    switch (activeTool) {
      case "line":
        toolRef.current = new LineTool(renderer, camera, scene, plane);
        toolRef.current.enable();
        break;
      case "rectangle":
        toolRef.current = new RectangleTool(renderer, camera, scene, plane);
        toolRef.current.enable();
        break;
      case "circle":
        toolRef.current = new CircleTool(renderer, camera, scene, plane);
        toolRef.current.enable();
        break;
      case "eraser":
        toolRef.current = new EraserTool(renderer, camera, scene, plane);
        toolRef.current.enable();
        break;
      default:
        toolRef.current = null;
    }
  }, [activeTool, mode]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = mode === "3d";
    }
  }, [mode]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
