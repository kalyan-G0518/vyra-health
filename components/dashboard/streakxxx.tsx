"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Flame, Trophy } from "lucide-react";

import { supabase } from "@/lib/supabase";

const STEP_GOAL = 7500;

type HealthLog = {
  steps: number;
  created_at: string;
};

export default function StreakTracker() {
  const [streak, setStreak] =
    useState(0);

  const [bestStreak, setBestStreak] =
    useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: true,
        });

      if (!error && data) {
        let currentStreak = 0;
        let highestStreak = 0;

        data.forEach((log) => {
          if (log.steps >= STEP_GOAL) {
            currentStreak++;

            if (
              currentStreak >
              highestStreak
            ) {
              highestStreak =
                currentStreak;
            }
          } else {
            currentStreak = 0;
          }
        });

        setStreak(currentStreak);
        setBestStreak(highestStreak);
      }
    };

    fetchLogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <Flame
            size={28}
            className="text-orange-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Consistency Streak
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Track your goal completion
            momentum
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        {/* Current Streak */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-black/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <p className="text-zinc-400">
              Current Streak
            </p>

            <Flame
              size={22}
              className="text-orange-400"
            />
          </div>

          <h3 className="text-5xl font-bold relative z-10">
            {streak}
          </h3>

          <p className="mt-3 text-zinc-400 text-sm relative z-10">
            Consecutive active days
          </p>
        </motion.div>

        {/* Best Streak */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-black/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-2xl rounded-full" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <p className="text-zinc-400">
              Best Streak
            </p>

            <Trophy
              size={22}
              className="text-yellow-400"
            />
          </div>

          <h3 className="text-5xl font-bold relative z-10">
            {bestStreak}
          </h3>

          <p className="mt-3 text-zinc-400 text-sm relative z-10">
            Highest consistency streak
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}