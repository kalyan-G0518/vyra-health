"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Brain,
  Moon,
  Activity,
  Sparkles,
  Flame,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type CoachTip = {
  title: string;

  message: string;

  icon: React.ReactNode;
};

export default function AICoach() {
  const [tips, setTips] =
    useState<CoachTip[]>([]);

  useEffect(() => {
    generateCoaching();
  }, []);

  const generateCoaching =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      // Latest activity
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

      // Latest sleep
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

      const generatedTips:
        CoachTip[] = [];

      // Sleep coaching
      if (sleep) {
        if (
          sleep.sleep_hours < 6
        ) {
          generatedTips.push({
            title:
              "Recovery Coaching",
            message:
              "Your sleep recovery is below optimal levels. Try improving bedtime consistency tonight.",
            icon: (
              <Moon className="text-violet-400" />
            ),
          });
        } else if (
          sleep.sleep_hours >= 8
        ) {
          generatedTips.push({
            title:
              "Strong Recovery",
            message:
              "Excellent sleep recovery detected. Your energy levels should feel stronger today.",
            icon: (
              <Sparkles className="text-violet-400" />
            ),
          });
        }
      }

      // Activity coaching
      if (activity) {
        if (
          activity.steps < 4000
        ) {
          generatedTips.push({
            title:
              "Movement Reminder",
            message:
              "Your movement levels are lower today. Even a short walk can improve recovery and energy.",
            icon: (
              <Activity className="text-cyan-400" />
            ),
          });
        }

        if (
          activity.steps >= 10000
        ) {
          generatedTips.push({
            title:
              "Excellent Activity",
            message:
              "Amazing movement consistency today. Your cardiovascular activity is improving steadily.",
            icon: (
              <Flame className="text-orange-400" />
            ),
          });
        }
      }

      // Fallback
      if (
        generatedTips.length ===
        0
      ) {
        generatedTips.push({
          title:
            "AI Coach Ready",
          message:
            "Log more wellness data to unlock smarter personalized coaching.",
          icon: (
            <Brain className="text-cyan-400" />
          ),
        });
      }

      setTips(generatedTips);
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
      className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              AI Coach
            </h2>

            <p className="text-zinc-400 mt-2">
              Personalized wellness
              coaching powered by
              your recovery and
              activity data
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Brain className="text-cyan-400" />
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-5">
          {tips.map(
            (tip, index) => (
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
                  delay:
                    index * 0.08,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="mt-1">
                  {tip.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {tip.title}
                  </h3>

                  <p className="text-zinc-400 mt-2 leading-7">
                    {tip.message}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}