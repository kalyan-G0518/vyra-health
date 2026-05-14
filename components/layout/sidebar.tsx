import {
  LayoutDashboard,
  Activity,
  Brain,
  Settings,
  User,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    icon: Activity,
    label: "Health",
  },
  {
    icon: Brain,
    label: "AI Insights",
  },
  {
    icon: User,
    label: "Profile",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-white/10 bg-black/40 backdrop-blur-xl text-white p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Vyra
        </h1>

        <p className="text-sm text-zinc-400 mt-1">
          AI Health Tracker
        </p>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <item.icon size={20} />

            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}