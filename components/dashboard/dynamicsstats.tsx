"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import HealthCard from "./healthcard";

type HealthLog = {
  steps: number;
  sleep_hours: number;
  water_intake: number;
  calories: number;
};

export default function DynamicStatsGrid() {
  const [healthLog, setHealthLog] =
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
        setHealthLog(data);
      }
    };

    fetchLatestLog();
  }, []);

  if (!healthLog) {
    return (
      <p className="text-zinc-400 mt-8">
        No health data yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      <HealthCard
        title="Steps"
        value={`${healthLog.steps}`}
        change="Latest"
      />

      <HealthCard
        title="Sleep"
        value={`${healthLog.sleep_hours} hrs`}
        change="Latest"
      />

      <HealthCard
        title="Water"
        value={`${healthLog.water_intake} ml`}
        change="Latest"
      />

      <HealthCard
        title="Calories"
        value={`${healthLog.calories}`}
        change="Latest"
      />
    </div>
  );
}