"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Activity, Moon } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function WellnessScore() {
  const [score, setScore] =
    useState(0);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    calculateScore();
  }, []);

  const calculateScore =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      // Fetch activity
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

      // Fetch sleep
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

      let totalScore = 0;

      // ACTIVITY SCORE
      if (activity) {
        const stepScore =
          Math.min(
            activity.steps / 10000,
            1
          ) * 30;

        const activeScore =
          Math.min(
            activity.active_minutes /
              60,
            1
          ) * 20;

        totalScore +=
          stepScore + activeScore;
      }

      // SLEEP SCORE
      if (sleep) {
        const sleepHoursScore =
          Math.min(
            sleep.sleep_hours / 8,
            1
          ) * 35;

        let qualityScore = 0;

        switch (
          sleep.sleep_quality
        ) {
          case "Excellent":
            qualityScore = 15;
            break;

          case "Good":
            qualityScore = 12;
            break;

          case "Average":
            qualityScore = 8;
            break;

          case "Poor":
            qualityScore = 4;
            break;
        }

        totalScore +=
          sleepHoursScore +
          qualityScore;
      }

      const finalScore =
        Math.round(totalScore);

      setScore(finalScore);

      // Messages
      if (finalScore >= 85) {
        setMessage(
          "Excellent recovery and activity levels"
        );
      } else if (
        finalScore >= 70
      ) {
        setMessage(
          "Good wellness balance today"
        );
      } else if (
        finalScore >= 50
      ) {
        setMessage(
          "You may need better recovery and movement"
        );
      } else {
        setMessage(
          "Focus on sleep and activity recovery"
        );
      }
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Wellness Score
            </h2>

            <p className="text-zinc-400 mt-2">
              AI-powered recovery and
              wellness analysis
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Activity
              size={30}
              className="text-cyan-400"
            />
          </div>
        </div>

        {/* Score */}
        <div className="mt-10 flex items-center gap-8">
          {/* Circle */}
          <div className="relative w-40 h-40">
            <svg
              className="rotate-[-90deg]"
              width="160"
              height="160"
            >
              {/* Background */}
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
                fill="transparent"
              />

              {/* Progress */}
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="#22d3ee"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${
                  2 *
                  Math.PI *
                  68
                }`}
                strokeDashoffset={`${
                  2 *
                    Math.PI *
                    68 -
                  (score / 100) *
                    2 *
                    Math.PI *
                    68
                }`}
                className="transition-all duration-1000"
              />
            </svg>

            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">
                {score}
              </span>

              <span className="text-zinc-400 text-sm mt-1">
                /100
              </span>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Activity className="text-cyan-400" />

              <span className="text-lg">
                Activity and movement
                analyzed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Moon className="text-violet-400" />

              <span className="text-lg">
                Sleep recovery included
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-300 mt-3">
              {message}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}