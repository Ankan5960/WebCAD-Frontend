import { useDrawingToolStore } from "../store/drawingTool.store";
import { tools, type IDrawingTool } from "../types/DrawingToolTypes";
import { useSidebarStore } from "../store/sidebar.store";

type SidebarToolProps = {
  tool: IDrawingTool;
};

const SidebarElements: React.FC<SidebarToolProps> = ({tool}) => {
  const activeTool = useDrawingToolStore((state) => state.activeTool);
  const setTool = useDrawingToolStore((state) => state.setTool);

  const isActive = activeTool?.id === tool.id;
  const Icon = tool.icon;

  return (
    <button
      onClick={() => setTool(tool)}
      className={`flex items-center gap-2 p-3 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
      }`}
    >
      <Icon />
      <span className="text-sm">{tool.name}</span>
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
        {
          tools.map((tool) => (
            <SidebarElements
              key={tool.id}
              tool={tool}
            />
          ))
        }
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
