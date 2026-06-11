import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { LineTool } from "../drawing-engine/LineTool";
import { useDrawingToolStore } from "../store/drawingTool.store";
import { DrawTool } from "../drawing-engine/DrawTool";
import { RectangleTool } from "../drawing-engine/RectangleTool";
import { CircleTool } from "../drawing-engine/CircleTool";
import { useViewModeStore } from "../store/viewMode.store";
import { EraserTool } from "../drawing-engine/EraserTool ";

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

    // Inside your scene setup (after creating scene)
    const axisLength = 1;

    // X axis → red
    const xArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0), // direction
      new THREE.Vector3(0, 0, 0), // origin
      axisLength,
      0xff0000 // color
    );
    scene.add(xArrow);

    // Y axis → green
    const yArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      axisLength,
      0x00ff00
    );
    scene.add(yArrow);

    // Z axis → blue
    const zArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      axisLength,
      0x0000ff
    );
    scene.add(zArrow);

    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);
    planeRef.current = plane;

    // Orbit Controls (only for perspective)
    const perspControls = new OrbitControls(perspCam, renderer.domElement);
    perspControls.enableDamping = true;
    perspControls.dampingFactor = 0.05;
    perspControls.screenSpacePanning = true; // ✅ allow panning
    perspControls.enablePan = true;
    perspControls.minDistance = 2;
    perspControls.maxDistance = 50;
    perspControls.maxPolarAngle = Math.PI / 2;
    perspControlsRef.current = perspControls;

    // Orthographic controls
    const orthoControls = new OrbitControls(orthoCam, renderer.domElement);
    orthoControls.enableRotate = false;
    orthoControls.enablePan = true;
    orthoControls.enableZoom = true;
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

    switch (activeTool?.id) {
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
