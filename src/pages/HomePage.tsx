import Sidebar from "../components/Sidebar";
import Compass from "../components/Compass";
import ThreeScene from "../components/ThreeScene";
import { useState } from "react";
import {
  BoxIcon,
  CompassIcon,
  GridIcon,
  MenuIcon,
  SettingsIcon,
  SunIcon,
} from "../assets/icons/Icons";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cameraRotation, setCameraRotation] = useState(0);

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-slate-200 overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-800 shadow-lg relative z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            <MenuIcon />
          </button>
          <div className="flex items-center space-x-2">
            <BoxIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold text-white">WebCAD</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <SunIcon />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <SettingsIcon />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-slate-200 p-4 transition-all duration-300 ease-in-out z-10 ${
            isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
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

        {/* 3D Canvas Container */}
        <div className="relative flex-1 bg-gray-900">
          <ThreeScene onCameraRotate={setCameraRotation} />
          <Compass rotation={cameraRotation} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
