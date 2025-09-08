import { FaEraser, FaRegCircle } from "react-icons/fa";
import { useDrawingToolStore } from "../store/drawingTool.store";
import { useSidebarStore } from "../store/sidebar.store";
import { LuRectangleHorizontal } from "react-icons/lu";
import { MdLinearScale } from "react-icons/md";
import type { IconType } from "react-icons";

type SidebarToolProps = {
  icon: IconType;
  label: string;
  tool: "line" | "rectangle" | "circle" | "eraser" | null;
};

const SidebarElements = ({ icon: Icon, label, tool }: SidebarToolProps) => {
  const { activeTool, setTool } = useDrawingToolStore();
  const isActive = activeTool === tool;

  return (
    <button
      onClick={() => setTool(tool)}
      className={`flex items-center gap-2 p-3 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
      }`}
    >
      <span className="text-lg">
        <Icon />
      </span>
      <span className="text-sm">{label}</span>
    </button>
  );
};

const Sidebar = () => {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <aside
      className={`fixed top-[64px] left-0 h-full w-64 bg-gray-800 text-slate-200 p-4 transition-transform duration-300 ease-in-out z-20 
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
          Drawing-Tools
        </h2>
        <SidebarElements icon={MdLinearScale} label="Line" tool="line" />
        <SidebarElements
          icon={LuRectangleHorizontal}
          label="Rectangle"
          tool="rectangle"
        />
        <SidebarElements icon={FaRegCircle} label="Circle" tool="circle" />
        <SidebarElements icon={FaEraser} label="Eraser" tool="eraser" />

        <div className="w-full h-px bg-slate-700 my-4" />
        <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
          History
        </h2>
        <p className="text-slate-400 text-sm p-3">No history yet.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
