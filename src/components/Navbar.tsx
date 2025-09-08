import { BsBadge3D, BsBadge3dFill } from "react-icons/bs";
import {
  BoxIcon,
  MenuIcon
} from "../assets/icons/Icons";
import { useSidebarStore } from "../store/sidebar.store";
import { useViewModeStore } from "../store/viewMode.store";

const Navbar = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const { mode, toggleMode } = useViewModeStore();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 shadow-lg relative z-30">
      <div className="flex items-center space-x-1">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
        >
          <MenuIcon />
        </button>
        <div className="flex items-center space-x-1">
          <BoxIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-xl font-bold text-white">WebCAD</h1>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        {/* <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
          <SunIcon />
        </button>
        <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
          <SettingsIcon />
        </button> */}
        <button
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
          onClick={toggleMode}
        >
          {mode === "3d" ? (
            <BsBadge3dFill size={30} />
          ) : (
            <BsBadge3D size={30} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
