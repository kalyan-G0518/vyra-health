"use client";

import { motion } from "framer-motion";

import {
  Bell,
  Moon,
  ShieldCheck,
  Target,
  LogOut,
  ChevronRight,
} from "lucide-react";

import DashboardLayout from "@/components/layout/dashboardlayout";

import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const settingsItems = [
    {
      title: "Notifications",
      description:
        "Manage wellness reminders and alerts",
      icon: Bell,
      color: "text-cyan-400",
    },

    {
      title: "Appearance",
      description:
        "Customize your dashboard experience",
      icon: Moon,
      color: "text-violet-400",
    },

    {
      title: "Privacy & Security",
      description:
        "Manage account protection and security",
      icon: ShieldCheck,
      color: "text-emerald-400",
    },

    {
      title: "Wellness Goals",
      description:
        "Update your health and recovery goals",
      icon: Target,
      color: "text-orange-400",
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <h1 className="text-4xl font-bold">
              Settings
            </h1>

            <p className="text-zinc-400 mt-2 text-lg">
              Customize your Vyra wellness
              experience
            </p>
          </div>
        </motion.div>

        {/* Settings List */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          {/* Glow */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 space-y-5">
            {settingsItems.map(
              (item, index) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="bg-black/40 border border-white/10 rounded-2xl p-6 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <item.icon
                        size={24}
                        className={
                          item.color
                        }
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        {
                          item.description
                        }
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={20}
                    className="text-zinc-500"
                  />
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="relative overflow-hidden bg-red-500/5 border border-red-500/10 rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-bold">
                Logout
              </h2>

              <p className="text-zinc-400 mt-2">
                Sign out from your Vyra
                account securely
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 transition-all duration-300 rounded-2xl px-6 py-4 font-semibold text-white flex items-center gap-3"
            >
              <LogOut size={20} />

              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}