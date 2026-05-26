"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  CalendarDays,
  ShieldCheck,
  Activity,
  Moon,
  Apple,
} from "lucide-react";

import DashboardLayout from "@/components/layout/dashboardlayout";

import { supabase } from "@/lib/supabase";

type UserProfile = {
  email: string;
};

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<UserProfile | null>(
      null
    );

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setProfile({
          email: user.email || "",
        });
      }
    };

    fetchUser();
  }, []);

  const stats = [
    {
      title: "Health Tracking",
      icon: Activity,
      color: "text-red-400",
    },

    {
      title: "Sleep Monitoring",
      icon: Moon,
      color: "text-violet-400",
    },

    {
      title: "Nutrition Tracking",
      icon: Apple,
      color: "text-orange-400",
    },
  ];

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
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-5xl font-bold text-black shadow-2xl">
              {profile?.email
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold">
                Welcome Back
              </h1>

              <p className="text-zinc-400 mt-2 text-lg">
                Your AI wellness profile
              </p>

              <div className="mt-6 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail
                    size={18}
                    className="text-cyan-400"
                  />

                  <span>
                    {profile?.email}
                  </span>
                </div>

                {/* Joined */}
                <div className="flex items-center gap-3 text-zinc-300">
                  <CalendarDays
                    size={18}
                    className="text-violet-400"
                  />

                  <span>
                    Vyra Wellness Member
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 text-zinc-300">
                  <ShieldCheck
                    size={18}
                    className="text-emerald-400"
                  />

                  <span>
                    AI Wellness Tracking
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wellness Modules */}
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
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Wellness Modules
            </h2>

            <p className="text-zinc-400 mb-8">
              Your active Vyra wellness
              systems
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {stats.map(
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
                      scale: 1.03,
                    }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <item.icon
                        size={28}
                        className={
                          item.color
                        }
                      />

                      <div className="bg-emerald-500/10 border border-emerald-500/10 px-3 py-1 rounded-xl text-xs text-emerald-400">
                        Active
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-zinc-400 text-sm mt-2 leading-6">
                      Personalized AI
                      wellness monitoring
                      enabled.
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}