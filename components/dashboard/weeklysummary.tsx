"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  BrainCircuit,
  Activity,
  Moon,
  Droplets,
  Flame,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type SummaryItem = {
  title: string;
  insight: string;
  icon: any;
  color: string;
};

export default function WeeklySummary() {
  const [summary, setSummary] =
    useState<SummaryItem[]>([]);

  useEffect(() => {
    const generateSummary = async () => {
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

        const avgSteps = Math.round(
          totalSteps / count
        );

        const avgSleep =
          Math.round(
            (totalSleep / count) * 10
          ) / 10;

        const avgWater = Math.round(
          totalWater / count
        );

        const avgCalories = Math.round(
          totalCalories / count
        );

        const generatedSummary: SummaryItem[] =
          [];

        // Activity
        generatedSummary.push({
          title: "Activity",
          insight:
            avgSteps >= 7500
              ? "Your movement consistency remained strong this week with healthy activity levels."
              : "Activity levels remained slightly below the recommended movement target.",
          icon: Activity,
          color: "emerald",
        });

        // Sleep
        generatedSummary.push({
          title: "Recovery",
          insight:
            avgSleep < 6
              ? "Sleep duration appears lower than optimal for consistent recovery."
              : "Sleep consistency remained relatively balanced during the week.",
          icon: Moon,
          color: "violet",
        });

        // Water
        generatedSummary.push({
          title: "Hydration",
          insight:
            avgWater < 2000
              ? "Hydration patterns suggest reduced water intake during recent activity."
              : "Hydration consistency remained stable across recent logs.",
          icon: Droplets,
          color: "cyan",
        });

        // Calories
        generatedSummary.push({
          title: "Nutrition",
          insight:
            avgCalories > 2800
              ? "Calorie intake trended slightly higher than recommended levels."
              : "Nutrition balance remained relatively stable this week.",
          icon: Flame,
          color: "orange",
        });

        setSummary(generatedSummary);
      }
    };

    generateSummary();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mt-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <BrainCircuit
            size={28}
            className="text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Weekly Summary
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Personalized wellness
            interpretation
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-5 relative z-10">
        {summary.map((item, index) => (
          <motion.div
            key={item.title}
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
              scale: 1.02,
            }}
            className="relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full" />

            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <item.icon
                  size={22}
                  className="text-white"
                />
              </div>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>
            </div>

            <p className="text-zinc-300 leading-7 relative z-10">
              • {item.insight}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}