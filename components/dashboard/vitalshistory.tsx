"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  HeartPulse,
  Activity,
  ShieldPlus,
  Brain,
  Clock3,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type VitalsLog = {
  id: number;

  heart_rate: number;

  spo2: number;

  systolic_bp: number;

  diastolic_bp: number;

  stress_level: string;

  created_at: string;
};

export default function VitalsHistory() {
  const [logs, setLogs] = useState<
    VitalsLog[]
  >([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_vitals")
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
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-bold">
          Vitals History
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Monitor your recent wellness
          and body metrics
        </p>
      </div>

      {/* Empty */}
      {logs.length === 0 && (
        <div className="text-zinc-500 text-center py-10">
          No vitals logged yet
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
                  Wellness Snapshot
                </h3>

                <div className="flex items-center gap-2 text-zinc-500 text-sm mt-1">
                  <Clock3 size={14} />

                  <span>
                    {new Date(
                      log.created_at
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/10 rounded-xl px-4 py-2">
                <span className="text-red-400 font-semibold">
                  {log.stress_level} Stress
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Heart Rate */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <HeartPulse
                    size={18}
                    className="text-red-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Heart Rate
                  </span>
                </div>

                <p className="text-2xl font-bold">
                  {log.heart_rate}
                  <span className="text-sm ml-1 text-zinc-500">
                    BPM
                  </span>
                </p>
              </div>

              {/* SpO2 */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Activity
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    SpO₂
                  </span>
                </div>

                <p className="text-2xl font-bold">
                  {log.spo2}
                  <span className="text-sm ml-1 text-zinc-500">
                    %
                  </span>
                </p>
              </div>

              {/* Blood Pressure */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldPlus
                    size={18}
                    className="text-yellow-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Blood Pressure
                  </span>
                </div>

                <p className="text-2xl font-bold">
                  {log.systolic_bp}/
                  {log.diastolic_bp}
                </p>
              </div>

              {/* Stress */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Brain
                    size={18}
                    className="text-violet-400"
                  />

                  <span className="text-zinc-400 text-sm">
                    Stress
                  </span>
                </div>

                <p className="text-2xl font-bold">
                  {log.stress_level}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}