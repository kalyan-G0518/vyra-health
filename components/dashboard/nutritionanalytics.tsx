"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Flame,
  Beef,
  Droplets,
  Wheat,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type NutritionStats = {
  avgCalories: number;

  avgProtein: number;

  avgCarbs: number;

  avgWater: number;
};

export default function NutritionAnalytics() {
  const [stats, setStats] =
    useState<NutritionStats>({
      avgCalories: 0,
      avgProtein: 0,
      avgCarbs: 0,
      avgWater: 0,
    });

  useEffect(() => {
    const fetchAnalytics =
      async () => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) return;

        const { data, error } =
          await supabase
            .from("nutrition_logs")
            .select("*")
            .eq("user_id", user.id);

        if (
          !error &&
          data &&
          data.length > 0
        ) {
          const totalCalories =
            data.reduce(
              (sum, log) =>
                sum + log.calories,
              0
            );

          const totalProtein =
            data.reduce(
              (sum, log) =>
                sum + log.protein,
              0
            );

          const totalCarbs =
            data.reduce(
              (sum, log) =>
                sum + log.carbs,
              0
            );

          const totalWater =
            data.reduce(
              (sum, log) =>
                sum + log.water_intake,
              0
            );

          const count = data.length;

          setStats({
            avgCalories: Math.round(
              totalCalories / count
            ),

            avgProtein: Math.round(
              totalProtein / count
            ),

            avgCarbs: Math.round(
              totalCarbs / count
            ),

            avgWater: Math.round(
              totalWater / count
            ),
          });
        }
      };

    fetchAnalytics();
  }, []);

  const analyticsCards = [
    {
      title: "Avg Calories",
      value: `${stats.avgCalories} cal`,
      icon: Flame,
      color: "orange",
    },

    {
      title: "Avg Protein",
      value: `${stats.avgProtein} g`,
      icon: Beef,
      color: "red",
    },

    {
      title: "Avg Carbs",
      value: `${stats.avgCarbs} g`,
      icon: Wheat,
      color: "yellow",
    },

    {
      title: "Avg Hydration",
      value: `${stats.avgWater} ml`,
      icon: Droplets,
      color: "cyan",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold">
          Nutrition Analytics
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Your average nutrition
          performance
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 relative z-10">
        {analyticsCards.map(
          (card, index) => (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.03,
              }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-zinc-400 text-sm">
                  {card.title}
                </p>

                <card.icon
                  size={22}
                  className={`text-${card.color}-400`}
                />
              </div>

              <h3 className="text-3xl font-bold">
                {card.value}
              </h3>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}