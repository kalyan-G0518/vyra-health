"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

type ActivityLog = {
  id: string;

  workout_type: string;

  steps: number;

  calories_burned: number;

  active_minutes: number;

  created_at: string;
};

export default function ActivityHistory() {
  const [logs, setLogs] =
    useState<ActivityLog[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setLogs(data);
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
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      <h2 className="text-3xl font-bold mb-2">
        Activity History
      </h2>

      <p className="text-zinc-400 mb-8">
        Your recent workouts and
        movement logs
      </p>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-black/40 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {log.workout_type}
              </h3>

              <p className="text-zinc-400 text-sm mt-1">
                {log.steps} steps •{" "}
                {log.calories_burned} cal
                • {log.active_minutes} mins
              </p>
            </div>

            <div className="text-sm text-zinc-500">
              {new Date(
                log.created_at
              ).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}