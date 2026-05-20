"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  TrendingUp,
  Moon,
  Droplets,
  Flame,
  Activity,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type HealthLog = {
  steps: number;
  sleep_hours: number;
  water_intake: number;
  calories: number;
};

type Analytics = {
  avgSteps: number;
  avgSleep: number;
  avgWater: number;
  avgCalories: number;
  totalLogs: number;
};

export default function WeeklyAnalytics() {
  const [analytics, setAnalytics] =
    useState<Analytics | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data && data.length > 0) {
        const totalSteps = data.reduce(
          (sum, log) => sum + log.steps,
          0
        );

        const totalSleep = data.reduce(
          (sum, log) =>
            sum + log.sleep_hours,
          0
        );

        const totalWater = data.reduce(
          (sum, log) =>
            sum + log.water_intake,
          0
        );

        const totalCalories = data.reduce(
          (sum, log) =>
            sum + log.calories,
          0
        );

        const count = data.length;

        setAnalytics({
          avgSteps: Math.round(
            totalSteps / count
          ),

          avgSleep:
            Math.round(
              (totalSleep / count) * 10
            ) / 10,

          avgWater: Math.round(
            totalWater / count
          ),

          avgCalories: Math.round(
            totalCalories / count
          ),

          totalLogs: count,
        });
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return null;

  const cards = [
    {
      title: "Avg Steps",
      value: analytics.avgSteps,
      icon: TrendingUp,
      color: "emerald",
    },
    {
      title: "Avg Sleep",
      value: `${analytics.avgSleep} hrs`,
      icon: Moon,
      color: "violet",
    },
    {
      title: "Avg Water",
      value: `${analytics.avgWater} ml`,
      icon: Droplets,
      color: "cyan",
    },
    {
      title: "Avg Calories",
      value: analytics.avgCalories,
      icon: Flame,
      color: "orange",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <Activity
            size={28}
            className="text-emerald-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Weekly Analytics
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            AI-powered performance trends
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 relative z-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="bg-black/40 border border-white/10 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <p className="text-zinc-400 text-sm">
                {card.title}
              </p>

              <card.icon
                size={20}
                className="text-white"
              />
            </div>

            <h3 className="text-3xl font-bold relative z-10">
              {card.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-sm text-zinc-400 relative z-10">
        Based on{" "}
        <span className="text-white font-semibold">
          {analytics.totalLogs}
        </span>{" "}
        tracked health logs.
      </div>
    </motion.div>
  );
}