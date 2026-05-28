"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Flame, Trophy } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function StreakCard() {
  const [streak, setStreak] =
    useState(0);

  const [longestStreak, setLongestStreak] =
    useState(0);

  useEffect(() => {
    calculateStreak();
  }, []);

  const calculateStreak =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      // Fetch activity logs
      const { data: activityLogs } =
        await supabase
          .from("daily_activity")
          .select("created_at")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: true,
          });

      if (
        !activityLogs ||
        activityLogs.length === 0
      )
        return;

      // Unique dates
      const uniqueDates = [
        ...new Set(
          activityLogs.map(
            (log) =>
              new Date(
                log.created_at
              )
                .toISOString()
                .split("T")[0]
          )
        ),
      ];

      let currentStreak = 1;

      let bestStreak = 1;

      for (
        let i = 1;
        i < uniqueDates.length;
        i++
      ) {
        const prevDate =
          new Date(
            uniqueDates[i - 1]
          );

        const currentDate =
          new Date(
            uniqueDates[i]
          );

        const diff =
          (currentDate.getTime() -
            prevDate.getTime()) /
          (1000 *
            60 *
            60 *
            24);

        if (diff === 1) {
          currentStreak++;

          bestStreak = Math.max(
            bestStreak,
            currentStreak
          );
        } else {
          currentStreak = 1;
        }
      }

      setStreak(currentStreak);

      setLongestStreak(bestStreak);
    };

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
      whileHover={{
        scale: 1.02,
      }}
      className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Daily Streak
            </h2>

            <p className="text-zinc-400 mt-2">
              Consistency builds
              long-term wellness
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Flame className="text-orange-400" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {/* Current */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="text-orange-400" />

              <span className="text-lg font-semibold">
                Current Streak
              </span>
            </div>

            <h3 className="text-5xl font-bold">
              {streak}
            </h3>

            <p className="text-zinc-400 mt-2">
              days active
            </p>
          </div>

          {/* Longest */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-yellow-400" />

              <span className="text-lg font-semibold">
                Best Streak
              </span>
            </div>

            <h3 className="text-5xl font-bold">
              {longestStreak}
            </h3>

            <p className="text-zinc-400 mt-2">
              days record
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-300">
          {streak >= 7
            ? "🔥 Amazing consistency! Keep the momentum going."
            : streak >= 3
            ? "💪 You're building healthy habits steadily."
            : "🚀 Start logging daily to build your streak."}
        </div>
      </div>
    </motion.div>
  );
}