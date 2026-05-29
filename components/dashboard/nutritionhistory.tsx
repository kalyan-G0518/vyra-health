"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Clock3,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type NutritionLog = {
  id: number;

  meal_name: string;

  calories: number;

  protein: number;

  carbs: number;

  water_intake: number;

  created_at: string;
};

export default function NutritionHistory() {
  const [logs, setLogs] = useState<
    NutritionLog[]
  >([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("nutrition_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        }).limit(3);

      if (!error && data) {
        setLogs(data);
      }
    };

    fetchLogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold">
          Nutrition History
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Your recent meal tracking
          activity
        </p>
      </div>

      {/* Empty State */}
      {logs.length === 0 && (
        <div className="text-zinc-500 text-center py-10">
          No nutrition logs yet
        </div>
      )}

      {/* Logs */}
      <div className="space-y-5 relative z-10">
        {logs.map((log, index) => (
          <motion.div
            key={log.id}
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
              scale: 1.01,
            }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            {/* Top */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-semibold">
                  {log.meal_name}
                </h3>

                <div className="flex items-center gap-2 text-zinc-500 text-sm mt-1">
                  <Clock3 size={14} />

                  <span>
                    {new Date(
                      log.created_at
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/10 rounded-xl px-4 py-2">
                <span className="text-orange-400 font-semibold">
                  {log.calories} cal
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Protein */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Beef
                    size={18}
                    className="text-red-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Protein
                  </span>
                </div>

                <p className="text-xl font-bold">
                  {log.protein}g
                </p>
              </div>

              {/* Carbs */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Wheat
                    size={18}
                    className="text-yellow-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Carbs
                  </span>
                </div>

                <p className="text-xl font-bold">
                  {log.carbs}g
                </p>
              </div>

              {/* Water */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Hydration
                  </span>
                </div>

                <p className="text-xl font-bold">
                  {log.water_intake}ml
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}