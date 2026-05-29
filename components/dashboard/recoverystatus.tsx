"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type RecoveryState =
  | "optimal"
  | "moderate"
  | "low";

export default function RecoveryStatus() {
  const [status, setStatus] =
    useState<RecoveryState>(
      "moderate"
    );

  const [message, setMessage] =
    useState("");

  const [score, setScore] =
    useState(0);

  useEffect(() => {
    calculateRecovery();
  }, []);

  const calculateRecovery =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      // Latest Activity
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

      // Latest Sleep
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

      let recoveryScore = 0;

      // Sleep scoring
      if (sleep) {
        const hours =
          Number(
            sleep.sleep_hours
          ) || 0;

        if (hours >= 8)
          recoveryScore += 50;
        else if (hours >= 6)
          recoveryScore += 35;
        else recoveryScore += 15;
      }

      // Activity scoring
      if (activity) {
        const steps =
          Number(
            activity.steps
          ) || 0;

        if (steps >= 10000)
          recoveryScore += 50;
        else if (steps >= 6000)
          recoveryScore += 35;
        else recoveryScore += 15;
      }

      setScore(recoveryScore);

      // Recovery states
      if (recoveryScore >= 80) {
        setStatus("optimal");

        setMessage(
          "Your recovery levels are excellent today. Your body appears well-rested and highly active."
        );
      } else if (
        recoveryScore >= 50
      ) {
        setStatus("moderate");

        setMessage(
          "Recovery is stable, but improving sleep and movement consistency can optimize performance."
        );
      } else {
        setStatus("low");

        setMessage(
          "Recovery levels are below optimal today. Prioritize hydration, sleep, and light activity."
        );
      }
    };

  // Dynamic styles
  const styles = {
    optimal: {
      bg:
        "from-emerald-500/10 to-green-500/10",

      glow:
        "bg-emerald-500/10",

      border:
        "border-emerald-500/20",

      icon: (
        <ShieldCheck className="text-emerald-400" />
      ),

      title:
        "Optimal Recovery",
    },

    moderate: {
      bg:
        "from-yellow-500/10 to-orange-500/10",

      glow:
        "bg-yellow-500/10",

      border:
        "border-yellow-500/20",

      icon: (
        <ShieldAlert className="text-yellow-400" />
      ),

      title:
        "Moderate Recovery",
    },

    low: {
      bg:
        "from-red-500/10 to-rose-500/10",

      glow:
        "bg-red-500/10",

      border:
        "border-red-500/20",

      icon: (
        <ShieldX className="text-red-400" />
      ),

      title:
        "Low Recovery",
    },
  };

  const current =
    styles[status];

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
      className={`relative overflow-hidden bg-gradient-to-br ${current.bg} border ${current.border} rounded-3xl p-8`}
    >
      {/* Glow */}
      <div
        className={`absolute top-0 right-0 w-72 h-72 ${current.glow} blur-3xl rounded-full`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Recovery Status
            </h2>

            <p className="text-zinc-400 mt-2">
              AI-powered wellness
              recovery analysis
            </p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className={`w-16 h-16 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-center`}
          >
            {current.icon}
          </motion.div>
        </div>

        {/* Recovery Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="text-cyan-400" />

              <span className="text-lg font-semibold">
                {current.title}
              </span>
            </div>

            <p className="text-zinc-300 leading-8 text-lg">
              {message}
            </p>
          </div>

          {/* Right Score */}
          <div className="flex justify-center">
            <div className="relative w-52 h-52 flex items-center justify-center">
              {/* Outer Circle */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`absolute inset-0 rounded-full border border-white/10`}
              />

              {/* Inner */}
              <div className="w-40 h-40 rounded-full bg-black/30 border border-white/10 flex flex-col items-center justify-center backdrop-blur-xl">
                <span className="text-6xl font-bold">
                  {score}
                </span>

                <span className="text-zinc-400 mt-2">
                  Recovery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}