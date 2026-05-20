"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type HealthLog = {
  id: number;
  steps: number;
  sleep_hours: number;
  water_intake: number;
  calories: number;
  mood: string;
  created_at: string;
};

export default function RecentLogs() {
  const [logs, setLogs] = useState<
    HealthLog[]
  >([]);

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
          ascending: false,
        })
        .limit(5);

      if (!error && data) {
        setLogs(data);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">
        Recent Logs
      </h2>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-black/40 border border-white/5 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold">
                {log.steps} steps
              </p>

              <span className="text-sm text-zinc-400">
                {new Date(
                  log.created_at
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-zinc-400">
              <p>
                Sleep: {log.sleep_hours} hrs
              </p>

              <p>
                Water: {log.water_intake} ml
              </p>

              <p>
                Calories: {log.calories}
              </p>

              <p>Mood: {log.mood}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}