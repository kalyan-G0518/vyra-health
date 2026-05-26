"use client";

import Link from "next/link";

import {
  User,
  Settings,
} from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full flex items-center justify-end gap-4 mb-8">
      {/* Profile */}
      <Link href="/profile">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer">
          <User size={20} />
        </div>
      </Link>

      {/* Settings */}
      <Link href="/settings">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer">
          <Settings size={20} />
        </div>
      </Link>
    </div>
  );
}