"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Activity = {
  id: number;
  workout_type: string;
  calories_burned: number;
  active_minutes: number;
  created_at: string;
};

export default function ActivityHistory() {
  const [logs, setLogs] =
    useState<Activity[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("workout_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(3);
        console.log("Current User:", user.id);
console.log("Workout Data:", data);
console.log("Workout Error:", error);

      if (error) {
        console.log(error);
      }

      setLogs(data || []);
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
      <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2">
          Recent Activity
        </h2>

        <p className="text-zinc-400 mb-8">
          Your latest workout logs
        </p>

        {loading ? (
          <div className="text-zinc-500">
            Loading...
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-center text-zinc-500">
            No activity logs found
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-black/30 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    {log.workout_type}
                  </h3>

                  <span className="text-zinc-400 text-sm">
                    {new Date(
                      log.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-6 mt-4 text-zinc-400 text-sm">
                  <span>
                    🔥 {log.calories_burned} cal
                  </span>

                  <span>
                    ⏱️ {log.active_minutes} mins
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}