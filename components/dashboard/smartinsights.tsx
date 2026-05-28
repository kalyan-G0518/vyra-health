"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Brain,
  Moon,
  Activity,
  TriangleAlert,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Insight = {
  title: string;

  description: string;

  icon: React.ReactNode;
};

export default function SmartInsights() {
  const [insights, setInsights] =
    useState<Insight[]>([]);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      // Fetch latest activity
      const { data: activity } =
        await supabase
          .from("daily_activity")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .single();

      // Fetch latest sleep
      const { data: sleep } =
        await supabase
          .from("sleep_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .single();

      const generatedInsights:
        Insight[] = [];

      // ACTIVITY INSIGHTS
      if (activity) {
        if (
          activity.steps >= 10000
        ) {
          generatedInsights.push({
            title:
              "Excellent Activity",
            description:
              "Your movement levels are excellent today. Great consistency!",
            icon: (
              <Activity className="text-cyan-400" />
            ),
          });
        } else if (
          activity.steps < 4000
        ) {
          generatedInsights.push({
            title:
              "Low Movement Detected",
            description:
              "Your activity levels are lower than usual today. Consider a short walk or light exercise.",
            icon: (
              <TriangleAlert className="text-yellow-400" />
            ),
          });
        }

        if (
          activity.active_minutes >=
          60
        ) {
          generatedInsights.push({
            title:
              "Strong Active Minutes",
            description:
              "You achieved a healthy amount of active minutes today.",
            icon: (
              <Sparkles className="text-emerald-400" />
            ),
          });
        }
      }

      // SLEEP INSIGHTS
      if (sleep) {
        if (
          sleep.sleep_hours >= 8
        ) {
          generatedInsights.push({
            title:
              "Excellent Recovery",
            description:
              "Your sleep duration supports strong recovery and performance.",
            icon: (
              <Moon className="text-violet-400" />
            ),
          });
        } else if (
          sleep.sleep_hours < 6
        ) {
          generatedInsights.push({
            title:
              "Sleep Recovery Dropped",
            description:
              "Your sleep duration is below ideal recovery levels. Try improving bedtime consistency.",
            icon: (
              <TriangleAlert className="text-red-400" />
            ),
          });
        }

        if (
          sleep.sleep_quality ===
          "Excellent"
        ) {
          generatedInsights.push({
            title:
              "High Sleep Quality",
            description:
              "Your sleep quality was excellent. Recovery metrics are improving.",
            icon: (
              <Moon className="text-violet-400" />
            ),
          });
        }
      }

      // FALLBACK
      if (
        generatedInsights.length ===
        0
      ) {
        generatedInsights.push({
          title:
            "Start Tracking",
          description:
            "Log more activity and sleep data to unlock AI-powered wellness insights.",
          icon: (
            <Brain className="text-cyan-400" />
          ),
        });
      }

      setInsights(
        generatedInsights
      );
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
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Smart Insights
            </h2>

            <p className="text-zinc-400 mt-2">
              AI-powered wellness
              analysis and recovery
              recommendations
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Brain className="text-cyan-400" />
          </div>
        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-5">
          {insights.map(
            (
              insight,
              index
            ) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                className="bg-black/40 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {insight.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {
                        insight.title
                      }
                    </h3>

                    <p className="text-zinc-400 text-sm mt-2 leading-6">
                      {
                        insight.description
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}