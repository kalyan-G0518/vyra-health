"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { motion } from "framer-motion";

import {
  Sparkles,
  Sunrise,
  Sun,
  Moon,
} from "lucide-react";

export default function DashboardHero() {
  const [name, setName] =
    useState("User");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      console.log(user);

      if (!user) return;

      const fullName =
        user.user_metadata
          ?.full_name;

      if (fullName) {
        setName(fullName);
      }
    };

  const hour =
    new Date().getHours();

  let greeting =
    "Good Evening";

  let icon = (
    <Moon className="text-violet-400" />
  );

  if (hour < 12) {
    greeting =
      "Good Morning";

    icon = (
      <Sunrise className="text-orange-400" />
    );
  } else if (hour < 18) {
    greeting =
      "Good Afternoon";

    icon = (
      <Sun className="text-yellow-400" />
    );
  }

  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400 mb-3">
              {today}
            </p>

            <div className="flex items-center gap-3">
              {icon}

              <h1 className="text-5xl font-bold">
                {greeting},{" "}
                {name} 👋
              </h1>
            </div>

            <p className="text-zinc-300 text-lg mt-5 max-w-2xl leading-8">
              Your wellness score is
              improving steadily.
              Maintain your sleep and
              activity consistency for
              optimal recovery.
            </p>
          </div>

          {/* Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <Sparkles className="text-cyan-400" />

            <span className="text-zinc-300">
              AI Wellness Active
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}