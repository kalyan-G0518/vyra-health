"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Sparkles,
  Brain,
  Activity,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function SmartInsights() {
  const [insights, setInsights] = useState<
    string[]
  >([]);

  useEffect(() => {
    const generateInsights = async () => {
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
        .limit(1)
        .single();

      if (!error && data) {
        const generatedInsights = [];

        if (data.steps < 5000) {
          generatedInsights.push(
            "Your activity level is lower than usual. Consider a short evening walk."
          );
        } else if (data.steps >= 7500) {
          generatedInsights.push(
            "Excellent work reaching your daily movement goal."
          );
        }

        if (data.sleep_hours < 6) {
          generatedInsights.push(
            "Your sleep duration appears low. Better sleep consistency may improve recovery."
          );
        }

        if (data.water_intake < 2000) {
          generatedInsights.push(
            "Hydration levels are below the recommended intake today."
          );
        }

        if (
          data.mood
            ?.toLowerCase()
            .includes("tired")
        ) {
          generatedInsights.push(
            "Your mood suggests fatigue. Recovery and hydration may help."
          );
        }

        if (data.calories > 3000) {
          generatedInsights.push(
            "Calorie intake appears relatively high today. Balance and consistency are important."
          );
        }

        setInsights(generatedInsights);
      }
    };

    generateInsights();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <Brain
            size={28}
            className="text-emerald-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Wellness Insights
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Personalized analysis based on
            your health activity
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-5 relative z-10">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl p-5"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                  <Sparkles
                    size={20}
                    className="text-emerald-400"
                  />
                </div>

                <div>
                  <p className="text-zinc-200 leading-relaxed">
                    {insight}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-zinc-500">
                    <Activity size={14} />

                    <span>
                      AI-generated wellness
                      recommendation
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-zinc-400">
            No insights available yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}