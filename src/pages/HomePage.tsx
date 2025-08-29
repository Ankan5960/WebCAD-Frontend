import Sidebar from "../components/Sidebar";
import Compass from "../components/Compass";
import ThreeScene from "../components/ThreeScene";
import { useState } from "react";
import {
  BoxIcon,
  CompassIcon,
  GridIcon
} from "../assets/icons/Icons";
import Navbar from "../components/Navbar";
import { useUIStore } from "../store/uiStore";

const HomePage = () => {
  const [cameraRotation, setCameraRotation] = useState(0);
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-slate-200 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* Sidebar (overlay, responsive) */}
        <aside
          className={`fixed top-[64px] left-0 h-full w-64 bg-gray-800 text-slate-200 p-4 transition-transform duration-300 ease-in-out z-20 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
        >
          <div className="flex flex-col space-y-2">
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
              Tools
            </h2>
            <Sidebar icon={BoxIcon} label="Extrude" />
            <Sidebar icon={GridIcon} label="Sketch" />
            <Sidebar icon={CompassIcon} label="Measure" />
            <div className="w-full h-px bg-slate-700 my-4" />
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
              History
            </h2>
            <p className="text-slate-400 text-sm p-3">No history yet.</p>
          </div>
        </aside>

        {/* 3D Canvas (always full screen) */}
        <div className="absolute inset-0 w-full h-full">
          <ThreeScene onCameraRotate={setCameraRotation} />
          <Compass rotation={cameraRotation} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
