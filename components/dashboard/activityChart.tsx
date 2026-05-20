"use client";

import { useEffect, useState } from "react";
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

import { supabase } from "@/lib/supabase";

type ChartData = {
  day: string;
  steps: number;
};

const TARGET_STEPS = 7500;

export default function ActivityChart() {
  const [chartData, setChartData] =
    useState<ChartData[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: true,
        });

      if (!error && data) {
        const formatted = data.map((log) => ({
          day: new Date(
            log.created_at
          ).toLocaleDateString("en-US", {
            weekday: "short",
          }),

          steps: log.steps,
        }));

        setChartData(formatted);
      }
    };

    fetchLogs();
  }, []);

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
          Daily activity vs target goal of
          7,500 steps
        </p>
      </div>

      <div className="h-[300px] w-full min-w-0 relative z-10">
        <ResponsiveContainer
          width="99%"
          height="100%"
        >
          <LineChart
            data={chartData}
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
              tick={{
                fill: "#d4d4d8",
                fontSize: 12,
              }}
            />

            <YAxis
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#71717a",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border:
                  "1px solid rgba(255,255,255,0.1)",
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
                value: "Target 7500",
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
                    fill={
                      achieved
                        ? "#10b981"
                        : "#71717a"
                    }
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