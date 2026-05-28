"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Footprints,
  Flame,
  Moon,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type RingProps = {
  value: number;

  goal: number;

  label: string;

  color: string;

  icon: React.ReactNode;

  unit?: string;
};

function ProgressRing({
  value,
  goal,
  label,
  color,
  icon,
  unit = "",
}: RingProps) {
  const percentage = Math.min(
    (value / goal) * 100,
    100
  );

  const radius = 58;

  const stroke = 10;

  const normalizedRadius =
    radius - stroke / 2;

  const circumference =
    normalizedRadius *
    2 *
    Math.PI;

  const strokeDashoffset =
    circumference -
    (percentage / 100) *
      circumference;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center"
    >
      <div
        className={`absolute inset-0 opacity-10 blur-3xl ${color}`}
      />

      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg]"
        >
          <circle
            stroke="rgba(255,255,255,0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke="currentColor"
            className={`${color} transition-all duration-700`}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <div className="mb-2">
            {icon}
          </div>

          <span className="text-2xl font-bold">
            {value}
          </span>

          <span className="text-xs text-zinc-400">
            / {goal}
            {unit}
          </span>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {label}
      </h3>
    </motion.div>
  );
}

export default function DailyRings() {
  const [steps, setSteps] =
    useState(0);

  const [calories, setCalories] =
    useState(0);

  const [sleep, setSleep] =
    useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      // Activity
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

      // Sleep
      const { data: sleepData } =
        await supabase
          .from("sleep_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .single();

      if (activity) {
        setSteps(
          activity.steps || 0
        );

        setCalories(
          activity.calories_burned ||
            0
        );
      }

      if (sleepData) {
        setSleep(
          Number(
            sleepData.sleep_hours
          ) || 0
        );
      }
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <ProgressRing
        value={steps}
        goal={10000}
        label="Steps"
        color="text-cyan-400"
        icon={
          <Footprints
            size={24}
            className="text-cyan-400"
          />
        }
      />

      <ProgressRing
        value={calories}
        goal={900}
        label="Calories"
        color="text-orange-400"
        icon={
          <Flame
            size={24}
            className="text-orange-400"
          />
        }
      />

      <ProgressRing
        value={sleep}
        goal={8}
        label="Sleep"
        color="text-violet-400"
        unit="h"
        icon={
          <Moon
            size={24}
            className="text-violet-400"
          />
        }
      />
    </div>
  );
}