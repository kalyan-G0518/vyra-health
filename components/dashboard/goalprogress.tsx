"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type HealthLog = {
  steps: number;
  water_intake: number;
};

const STEP_GOAL = 7500;
const WATER_GOAL = 3000;

export default function GoalProgress() {
  const [log, setLog] =
    useState<HealthLog | null>(null);

  useEffect(() => {
    const fetchLatestLog = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .single();

      if (!error && data) {
        setLog(data);
      }
    };

    fetchLatestLog();
  }, []);

  if (!log) return null;

  const stepProgress = Math.min(
    (log.steps / STEP_GOAL) * 100,
    100
  );

  const waterProgress = Math.min(
    (log.water_intake / WATER_GOAL) * 100,
    100
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {/* Steps */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Step Goal
          </h2>

          <span className="text-sm text-zinc-400">
            {log.steps}/{STEP_GOAL}
          </span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{
              width: `${stepProgress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-zinc-400">
          {Math.round(stepProgress)}%
          completed
        </p>
      </div>

      {/* Water */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Hydration Goal
          </h2>

          <span className="text-sm text-zinc-400">
            {log.water_intake}/{WATER_GOAL} ml
          </span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
          <div
            className="bg-cyan-500 h-full rounded-full transition-all duration-500"
            style={{
              width: `${waterProgress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-zinc-400">
          {Math.round(waterProgress)}%
          completed
        </p>
      </div>
    </div>
  );
}