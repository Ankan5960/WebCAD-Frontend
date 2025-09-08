import Sidebar from "../components/Sidebar";
import Compass from "../components/Compass";
import ThreeScene from "../components/ThreeScene";
import { useState } from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [cameraRotation, setCameraRotation] = useState(0);
  
  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-slate-200 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* Sidebar (overlay, responsive) */}
        <Sidebar />

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
