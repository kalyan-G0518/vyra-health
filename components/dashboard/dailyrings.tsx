"use client";

import { motion } from "framer-motion";

import {
  Footprints,
  Flame,
  Moon,
} from "lucide-react";

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
      {/* Glow */}
      <div
        className={`absolute inset-0 opacity-10 blur-3xl ${color}`}
      />

      {/* Ring */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg]"
        >
          {/* Background */}
          <circle
            stroke="rgba(255,255,255,0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Progress */}
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

        {/* Center Content */}
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

      {/* Label */}
      <h3 className="mt-5 text-lg font-semibold">
        {label}
      </h3>
    </motion.div>
  );
}

export default function DailyRings() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Steps */}
      <ProgressRing
        value={7420}
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

      {/* Calories */}
      <ProgressRing
        value={620}
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

      {/* Sleep */}
      <ProgressRing
        value={7}
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