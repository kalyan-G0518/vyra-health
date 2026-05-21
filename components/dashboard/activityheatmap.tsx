"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  CalendarDays,
  Info,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type HeatmapDay = {
  date: string;
  steps: number;
  sleep: number;
  water: number;
  intensity: number;
};

const weekdays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ActivityHeatmap() {
  const [days, setDays] = useState<
    HeatmapDay[]
  >([]);

  const [hoveredDay, setHoveredDay] =
    useState<HeatmapDay | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("health_logs")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data) {
        const logsMap = new Map();

        data.forEach((log) => {
          const date =
            log.created_at.split("T")[0];

          let intensity = 1;

          if (log.steps >= 10000) {
            intensity = 5;
          } else if (
            log.steps >= 7500
          ) {
            intensity = 4;
          } else if (
            log.steps >= 5000
          ) {
            intensity = 3;
          } else if (
            log.steps >= 2000
          ) {
            intensity = 2;
          }

          logsMap.set(date, {
            date,
            steps: log.steps,
            sleep: log.sleep_hours,
            water: log.water_intake,
            intensity,
          });
        });

        const generatedDays: HeatmapDay[] =
          [];

        for (let i = 364; i >= 0; i--) {
          const currentDate = new Date();

          currentDate.setDate(
            currentDate.getDate() - i
          );

          const formattedDate =
            currentDate
              .toISOString()
              .split("T")[0];

          generatedDays.push(
            logsMap.get(formattedDate) || {
              date: formattedDate,
              steps: 0,
              sleep: 0,
              water: 0,
              intensity: 0,
            }
          );
        }

        setDays(generatedDays);
      }
    };

    fetchLogs();
  }, []);

  const intensityColors = [
    "bg-zinc-900",
    "bg-emerald-950",
    "bg-emerald-900",
    "bg-emerald-700",
    "bg-emerald-500",
    "bg-emerald-300",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mt-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
            <CalendarDays
              size={28}
              className="text-emerald-400"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Activity Heatmap
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Your activity overview for
              the past year
            </p>
          </div>
        </div>

        <div className="bg-black/30 border border-white/10 rounded-2xl px-5 py-3 text-zinc-300 text-sm">
          Last 12 Months
        </div>
      </div>

      {/* Months */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[950px]">
          <div className="flex ml-14 mb-4 text-xs text-zinc-500 justify-between px-2">
            {months.map((month) => (
              <span key={month}>
                {month}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {/* Weekdays */}
            <div className="flex flex-col gap-[6px] text-xs text-zinc-500 mt-[2px]">
              {weekdays.map((day) => (
                <span
                  key={day}
                  className="h-4"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-rows-7 grid-flow-col gap-[6px] relative">
              {days.map((day, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.25,
                  }}
                  onMouseEnter={() =>
                    setHoveredDay(day)
                  }
                  onMouseLeave={() =>
                    setHoveredDay(null)
                  }
                  className={`w-4 h-4 rounded-[4px] border border-white/5 cursor-pointer transition-all duration-200 ${intensityColors[day.intensity]}`}
                />
              ))}

              {/* Tooltip */}
              {hoveredDay &&
                hoveredDay.steps > 0 && (
                  <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 rounded-2xl p-4 z-50 w-56 shadow-2xl">
                    <p className="text-sm text-white mb-3">
                      {hoveredDay.date}
                    </p>

                    <div className="space-y-2 text-sm">
                      <p className="text-emerald-400">
                        Steps:{" "}
                        {hoveredDay.steps}
                      </p>

                      <p className="text-cyan-400">
                        Sleep:{" "}
                        {hoveredDay.sleep} hrs
                      </p>

                      <p className="text-violet-400">
                        Water:{" "}
                        {hoveredDay.water} ml
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-8 text-sm text-zinc-400">
        {/* Legend */}
        <div className="flex items-center gap-3">
          <span>Less</span>

          {intensityColors.map(
            (color, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-sm ${color}`}
              />
            )
          )}

          <span>More</span>
        </div>

        {/* Info */}
        <div className="flex items-center gap-2">
          <Info size={16} />

          <span>
            Higher intensity means more
            activity
          </span>
        </div>
      </div>
    </motion.div>
  );
}