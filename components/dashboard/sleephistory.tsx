"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Moon,
  Clock3,
  Sunrise,
  BedDouble,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type SleepLog = {
  id: number;

  sleep_hours: number;

  sleep_quality: string;

  bedtime: string;

  wakeup_time: string;

  created_at: string;
};

export default function SleepHistory() {
  const [logs, setLogs] = useState<
    SleepLog[]
  >([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("sleep_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (!error && data) {
        setLogs(data);
      }
    };

    fetchLogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold">
          Sleep History
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Your recent recovery and
          sleep tracking activity
        </p>
      </div>

      {/* Empty */}
      {logs.length === 0 && (
        <div className="text-zinc-500 text-center py-10">
          No sleep logs yet
        </div>
      )}

      {/* Logs */}
      <div className="space-y-5 relative z-10">
        {logs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.01,
            }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            {/* Top */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-semibold">
                  {log.sleep_hours} hrs
                  sleep
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  {new Date(
                    log.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/10 rounded-xl px-4 py-2">
                <span className="text-violet-400 font-semibold">
                  {log.sleep_quality}
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Sleep */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <BedDouble
                    size={18}
                    className="text-violet-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Sleep
                  </span>
                </div>

                <p className="text-xl font-bold">
                  {log.sleep_hours} hrs
                </p>
              </div>

              {/* Bedtime */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock3
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Bedtime
                  </span>
                </div>

                <p className="text-xl font-bold">
                  {log.bedtime}
                </p>
              </div>

              {/* Wakeup */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sunrise
                    size={18}
                    className="text-yellow-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Wake Up
                  </span>
                </div>

                <p className="text-xl font-bold">
                  {log.wakeup_time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}