import { BoxIcon, MenuIcon, SettingsIcon, SunIcon } from "../assets/icons/Icons";
import { useUIStore } from "../store/uiStore";

const Navbar = ()=>{

    const toggleSidebar = useUIStore((state) => state.toggleSidebar);

    return(
        <nav className="flex items-center justify-between p-4 bg-gray-800 shadow-lg relative z-30">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSidebar}
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
    )
}

export default Navbar;