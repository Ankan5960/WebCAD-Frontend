type SidebarToolProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

const Sidebar = ({ icon: Icon, label }: SidebarToolProps) => (
  <button className="flex items-center gap-2 p-3 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg">
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Sidebar;
