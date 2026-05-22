"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

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
    href: "/dashboard",
  },

  {
    icon: Activity,
    label: "Health",
    href: "/health",
  },

  {
    icon: Brain,
    label: "AI Insights",
    href: "/insights",
  },

  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },

  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-white/10 bg-black/40 backdrop-blur-xl text-white p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Vyra
        </h1>

        <p className="text-sm text-zinc-400 mt-1">
          AI Health Tracker
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
            >
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 cursor-pointer group

                ${
                  isActive
                    ? "bg-emerald-500/15 border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                }`}
              >
                <item.icon
                  size={20}
                  className={`transition-all duration-300
                  ${
                    isActive
                      ? "text-emerald-400"
                      : "text-zinc-300 group-hover:text-white"
                  }`}
                />

                <span
                  className={`font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-white"
                      : "text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}