"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Activity,
  Moon,
  UtensilsCrossed,
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
    icon: UtensilsCrossed,
    label: "Nutrition",
    href: "/nutrition",
  },

  {
    icon: Moon,
    label: "Sleep",
    href: "/sleep",
  },

  
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative w-72 min-h-screen border-r border-white/10 bg-black/40 backdrop-blur-2xl text-white px-6 py-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />

      {/* Logo */}
      <div className="relative z-10 mb-14">
        <h1 className="text-4xl font-bold tracking-tight">
          Vyra
        </h1>

        <p className="text-sm text-zinc-500 mt-2">
          AI Wellness Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
            >
              <div
                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer

                ${
                  isActive
                    ? "bg-white text-black shadow-2xl scale-[1.02]"
                    : "hover:bg-white hover:text-black hover:scale-[1.02]"
                }`}
              >
                {/* Icon */}
                <item.icon
                  size={22}
                  className={`transition-all duration-300

                  ${
                    isActive
                      ? "text-black"
                      : "text-zinc-400 group-hover:text-black"
                  }`}
                />

                {/* Label */}
                <span
                  className={`font-medium text-[15px] transition-all duration-300

                  ${
                    isActive
                      ? "text-black"
                      : "text-zinc-300 group-hover:text-black"
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