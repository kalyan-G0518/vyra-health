"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type HealthLog = {
  steps: number;
  sleep_hours: number;
  water_intake: number;
  calories: number;
};

type Trend = {
  label: string;
  value: string;
  positive: boolean;
};

export default function TrendComparison() {
  const [trends, setTrends] = useState<
    Trend[]
  >([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(2);

      if (
        !error &&
        data &&
        data.length === 2
      ) {
        const latest = data[0];
        const previous = data[1];

        const calculateChange = (
          current: number,
          prev: number
        ) => {
          if (prev === 0) return 0;

          return Math.round(
            ((current - prev) / prev) * 100
          );
        };

        const generatedTrends = [
          {
            label: "Steps",
            value: `${calculateChange(
              latest.steps,
              previous.steps
            )}%`,
            positive:
              latest.steps >= previous.steps,
          },

          {
            label: "Sleep",
            value: `${calculateChange(
              latest.sleep_hours,
              previous.sleep_hours
            )}%`,
            positive:
              latest.sleep_hours >=
              previous.sleep_hours,
          },

          {
            label: "Hydration",
            value: `${calculateChange(
              latest.water_intake,
              previous.water_intake
            )}%`,
            positive:
              latest.water_intake >=
              previous.water_intake,
          },

          {
            label: "Calories",
            value: `${calculateChange(
              latest.calories,
              previous.calories
            )}%`,
            positive:
              latest.calories <=
              previous.calories,
          },
        ];

        setTrends(generatedTrends);
      }
    };

    fetchTrends();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8"
    >
      {/* Glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold">
          Trend Comparison
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Compare your latest activity
          trends
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 relative z-10">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.label}
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
            className="bg-black/40 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-zinc-400 text-sm">
                {trend.label}
              </p>

              {trend.positive ? (
                <TrendingUp
                  size={20}
                  className="text-emerald-400"
                />
              ) : (
                <TrendingDown
                  size={20}
                  className="text-red-400"
                />
              )}
            </div>

            <h3
              className={`text-4xl font-bold ${
                trend.positive
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {trend.value}
            </h3>

            
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}