"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

type SleepData = {
  day: string;

  sleep: number;
};

export default function SleepChart() {
  const [data, setData] =
    useState<SleepData[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData =
    async () => {
      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);

        return;
      }

      const { data: logs, error } =
        await supabase
          .from("sleep_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: true,
          });

      if (error) {
        console.log(error);

        setLoading(false);

        return;
      }

      if (!logs || logs.length === 0) {
        setData([]);

        setLoading(false);

        return;
      }

      // Format chart data
      const formattedData =
        logs.map((log) => ({
          day: new Date(
            log.created_at
          ).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          ),

          sleep:
            Number(
              log.sleep_hours
            ) || 0,
        }));

      setData(formattedData);

      setLoading(false);
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
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2">
          Sleep Trends
        </h2>

        <p className="text-zinc-400 mb-8">
          Your weekly sleep
          consistency and recovery
          patterns
        </p>

        {/* Chart */}
        <div className="h-80">
          {loading ? (
            <div className="h-full flex items-center justify-center text-zinc-500">
              Loading chart...
            </div>
          ) : data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500">
              No sleep data yet
            </div>
          ) : (
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

                <YAxis
                  stroke="#a1a1aa"
                  domain={[0, 12]}
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#111",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius:
                      "16px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#a855f7"
                  strokeWidth={4}
                  dot={{
                    r: 7,
                    fill: "#a855f7",
                  }}
                  activeDot={{
                    r: 9,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </motion.div>
  );
}