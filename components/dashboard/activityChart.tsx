"use client";

import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const data = [
  { day: "Mon", steps: 4000 },
  { day: "Tue", steps: 8200 },
  { day: "Wed", steps: 5100 },
  { day: "Thu", steps: 8400 },
  { day: "Fri", steps: 9200 },
  { day: "Sat", steps: 7400 },
  { day: "Sun", steps: 10000 },
];

const TARGET_STEPS = 7500;

export default function ActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="mb-6 relative z-10">
        <h2 className="text-2xl font-semibold">
          Weekly Activity
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Step count over the past 7 days
        </p>
      </div>

      <div className="h-72 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
  <LineChart
  data={data}
  margin={{
    top: 20,
    right: 30,
    left: 0,
    bottom: 10,
  }}
>
  <CartesianGrid
    strokeDasharray="3 3"
    stroke="rgba(255,255,255,0.05)"
  />

  <XAxis
    dataKey="day"
    stroke="#d4d4d8"
    tickLine={false}
    axisLine={false}
    tick={{ fill: "#d4d4d8", fontSize: 12 }}
  />

  <YAxis
    stroke="#71717a"
    tickLine={false}
    axisLine={false}
    tick={{ fill: "#71717a", fontSize: 12 }}
  />

  <Tooltip
    contentStyle={{
      backgroundColor: "#18181b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      color: "#fff",
    }}
    labelStyle={{
      color: "#fff",
    }}
  />

  <ReferenceLine
    y={TARGET_STEPS}
    stroke="#71717a"
    strokeDasharray="5 5"
    label={{
      value: "",
      position: "right",
      fill: "#a1a1aa",
      fontSize: 12,
    }}
  />

  <Line
    type="monotone"
    dataKey="steps"
    stroke="#10b981"
    strokeWidth={3}
    dot={({ cx, cy, payload }) => {
      const achieved =
        payload.steps >= TARGET_STEPS;

      return (
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill={achieved ? "#10b981" : "#ab1818"}
        />
      );
    }}
    activeDot={{
      r: 7,
      fill: "#10b981",
    }}
  />
</LineChart>
</ResponsiveContainer>
      </div>
    </motion.div>
  );
}