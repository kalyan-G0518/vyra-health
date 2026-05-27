"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

type ChartData = {
  day: string;

  steps: number;
};

export default function WeeklyActivityChart() {
  const [data, setData] =
    useState<ChartData[]>([]);

  useEffect(() => {
    fetchActivityData();
  }, []);

  const fetchActivityData =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { data: logs, error } =
        await supabase
          .from("activity_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("log_date", {
            ascending: true,
          });

      if (error || !logs) return;

      // Group unique days
      const groupedData:
        Record<string, number> = {};

      logs.forEach((log) => {
        const day =
          new Date(
            log.log_date
          ).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          );

        // Keep highest/latest steps
        if (
          !groupedData[day] ||
          log.steps >
            groupedData[day]
        ) {
          groupedData[day] =
            log.steps;
        }
      });

      // Convert to chart format
      const formattedData =
        Object.entries(
          groupedData
        ).map(([day, steps]) => ({
          day,
          steps,
        }));

      setData(formattedData);
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
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2">
          Weekly Activity
        </h2>

        <p className="text-zinc-400 mb-8">
          Your real-time movement
          trends and activity
          consistency
        </p>

        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

              <XAxis
                dataKey="day"
                stroke="#a1a1aa"
              />

              <Tooltip
                contentStyle={{
                  background:
                    "#111",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius:
                    "16px",
                }}
              />

              <Line
                type="monotone"
                dataKey="steps"
                stroke="#22d3ee"
                strokeWidth={4}
                dot={{
                  r: 6,
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}