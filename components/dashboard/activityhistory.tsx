"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

type Activity = {
  id: number;

  activity_name: string;

  calories_burned: number;

  active_minutes: number;

  created_at: string;
};

export default function ActivityHistory() {
  const [logs, setLogs] =
    useState<Activity[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { data } =
        await supabase
          .from("activity_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(3);

      if (data)
        setLogs(data);
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
      className="bg-white/5 border border-white/10 rounded-3xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-black/30 border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {log.activity_name}
              </h3>

              <span className="text-zinc-400 text-sm">
                {new Date(
                  log.created_at
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-6 mt-3 text-zinc-400 text-sm">
              <span>
                🔥 {
                  log.calories_burned
                } cal
              </span>

              <span>
                ⏱️ {
                  log.active_minutes
                } mins
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}