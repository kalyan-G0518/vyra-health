"use client";

import { useState } from "react";

import Sidebar from "./sidebar";

import Topbar from "./topbar";

import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 z-50 lg:hidden">
            <Sidebar />

            {/* Close */}
            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="absolute top-6 right-6 text-white"
            >
              <X size={28} />
            </button>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-2xl font-bold">
            Vyra
          </h1>
        </div>

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        {children}
      </main>
    </div>
  );
}