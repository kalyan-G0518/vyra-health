"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function WellnessScore() {
  const [score, setScore] =
    useState(0);

  const [status, setStatus] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const calculateScore =
      async () => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) return;

        // Fetch health logs
        const {
          data: healthLogs,
        } = await supabase
          .from("health_logs")
          .select("*")
          .eq("user_id", user.id);

        // Fetch nutrition logs
        const {
          data: nutritionLogs,
        } = await supabase
          .from("nutrition_logs")
          .select("*")
          .eq("user_id", user.id);

        // Fetch sleep logs
        const {
          data: sleepLogs,
        } = await supabase
          .from("sleep_logs")
          .select("*")
          .eq("user_id", user.id);

        // Fetch vitals
        const {
          data: vitalsLogs,
        } = await supabase
          .from("health_vitals")
          .select("*")
          .eq("user_id", user.id);

        let totalScore = 0;

        // Sleep Score
        if (
          sleepLogs &&
          sleepLogs.length > 0
        ) {
          const avgSleep =
            sleepLogs.reduce(
              (sum, log) =>
                sum +
                Number(
                  log.sleep_hours
                ),
              0
            ) / sleepLogs.length;

          if (avgSleep >= 8)
            totalScore += 25;
          else if (avgSleep >= 6)
            totalScore += 18;
          else totalScore += 10;
        }

        // Nutrition Score
        if (
          nutritionLogs &&
          nutritionLogs.length > 0
        ) {
          const avgWater =
            nutritionLogs.reduce(
              (sum, log) =>
                sum +
                log.water_intake,
              0
            ) /
            nutritionLogs.length;

          if (avgWater >= 2500)
            totalScore += 25;
          else if (
            avgWater >= 1800
          )
            totalScore += 18;
          else totalScore += 10;
        }

        // Activity Score
        if (
          healthLogs &&
          healthLogs.length > 0
        ) {
          const avgSteps =
            healthLogs.reduce(
              (sum, log) =>
                sum + log.steps,
              0
            ) / healthLogs.length;

          if (avgSteps >= 10000)
            totalScore += 25;
          else if (
            avgSteps >= 6000
          )
            totalScore += 18;
          else totalScore += 10;
        }

        // Vitals Score
        if (
          vitalsLogs &&
          vitalsLogs.length > 0
        ) {
          const avgHeart =
            vitalsLogs.reduce(
              (sum, log) =>
                sum +
                log.heart_rate,
              0
            ) /
            vitalsLogs.length;

          if (
            avgHeart >= 60 &&
            avgHeart <= 85
          )
            totalScore += 25;
          else totalScore += 18;
        }

        // Clamp score
        if (totalScore > 100)
          totalScore = 100;

        setScore(totalScore);

        // Status
        if (totalScore >= 85) {
          setStatus("Excellent");

          setMessage(
            "Your wellness patterns look highly balanced and consistent recently."
          );
        } else if (
          totalScore >= 70
        ) {
          setStatus("Good");

          setMessage(
            "Your wellness metrics are stable with some room for optimization."
          );
        } else if (
          totalScore >= 50
        ) {
          setStatus("Average");

          setMessage(
            "Some wellness metrics may need improvement for better recovery and health."
          );
        } else {
          setStatus("Low");

          setMessage(
            "Multiple wellness indicators suggest inconsistent recovery and health balance."
          );
        }
      };

    calculateScore();
  }, []);

  const progress =
    (score / 100) * 360;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-10 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <ShieldCheck
            size={28}
            className="text-emerald-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Vyra Wellness Score
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            AI-powered recovery and
            wellness readiness
          </p>
        </div>
      </div>

      {/* Score Circle */}
      <div className="flex flex-col items-center justify-center relative z-10">
        <div
          className="relative w-56 h-56 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(
              #34d399 ${progress}deg,
              rgba(255,255,255,0.08) ${progress}deg
            )`,
          }}
        >
          <div className="absolute w-44 h-44 rounded-full bg-black flex flex-col items-center justify-center border border-white/10">
            <h1 className="text-6xl font-bold">
              {score}
            </h1>

            <p className="text-zinc-400 text-sm mt-2">
              /100
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 text-center max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/10 mb-5">
            <Sparkles
              size={18}
              className="text-emerald-400"
            />

            <span className="text-emerald-400 font-semibold">
              {status}
            </span>
          </div>

          <p className="text-zinc-300 leading-7 text-lg">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}