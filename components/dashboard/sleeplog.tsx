"use client";

import { useState } from "react";

import { motion } from "framer-motion";
 import toast
  from "react-hot-toast";

import {
  Moon,
  BedDouble,
  Clock3,
  Sunrise,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function SleepLogForm() {
  const [sleepHours, setSleepHours] =
    useState("");

  const [sleepQuality, setSleepQuality] =
    useState("Good");

  const [bedtime, setBedtime] =
    useState("");

  const [wakeTime, setWakeTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("sleep_logs")
      .insert([
        {
          user_id: user.id,
          sleep_hours:
            Number(sleepHours),

          sleep_quality:
            sleepQuality,

          bedtime: bedtime,

          wakeup_time: wakeTime,
        },
      ]);

    setLoading(false);

    if (!error) {
      toast.success("Sleep log saved!");

      setSleepHours("");
      setBedtime("");
      setWakeTime("");
      setSleepQuality("Good");
    } else {
      toast.error("Error saving sleep log");

      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <Moon
            size={28}
            className="text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Sleep Logger
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Track your sleep and
            recovery patterns
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 relative z-10"
      >
        {/* Sleep Hours */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">
            Sleep Hours
          </label>

          <div className="relative">
            <BedDouble
              size={18}
              className="absolute left-4 top-4 text-violet-400"
            />

            <input
              type="number"
              step="0.1"
              value={sleepHours}
              onChange={(e) =>
                setSleepHours(
                  e.target.value
                )
              }
              placeholder="7.5"
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-violet-500/40"
              required
            />
          </div>
        </div>

        {/* Sleep Quality */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">
            Sleep Quality
          </label>

          <select
            value={sleepQuality}
            onChange={(e) =>
              setSleepQuality(
                e.target.value
              )
            }
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500/40"
          >
            <option>Excellent</option>

            <option>Good</option>

            <option>Average</option>

            <option>Poor</option>
          </select>
        </div>

        {/* Time Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Bedtime */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Bedtime
            </label>

            <div className="relative">
              <Clock3
                size={18}
                className="absolute left-4 top-4 text-cyan-400"
              />

              <input
                type="time"
                value={bedtime}
                onChange={(e) =>
                  setBedtime(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-cyan-500/40"
                required
              />
            </div>
          </div>

          {/* Wake Time */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Wake Up Time
            </label>

            <div className="relative">
              <Sunrise
                size={18}
                className="absolute left-4 top-4 text-yellow-400"
              />

              <input
                type="time"
                value={wakeTime}
                onChange={(e) =>
                  setWakeTime(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-yellow-500/40"
                required
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-500 hover:bg-violet-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-white"
        >
          {loading
            ? "Saving..."
            : "Save Sleep Log"}
        </button>
      </form>
    </motion.div>
  );
}