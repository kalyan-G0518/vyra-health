"use client";

import { useState } from "react";

import { motion } from "framer-motion";

 import toast from "react-hot-toast";

import {
  HeartPulse,
  Activity,
  ShieldPlus,
  Brain,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function VitalsLogForm() {
  const [heartRate, setHeartRate] =
    useState("");

  const [spo2, setSpo2] =
    useState("");

  const [systolicBP, setSystolicBP] =
    useState("");

  const [diastolicBP, setDiastolicBP] =
    useState("");

  const [stressLevel, setStressLevel] =
    useState("Low");

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
      .from("health_vitals")
      .insert([
        {
          user_id: user.id,

          heart_rate:
            Number(heartRate),

          spo2: Number(spo2),

          systolic_bp:
            Number(systolicBP),

          diastolic_bp:
            Number(diastolicBP),

          stress_level:
            stressLevel,
        },
      ]);

    setLoading(false);

    if (!error) {
      toast.success("Vitals saved!");

      setHeartRate("");
      setSpo2("");
      setSystolicBP("");
      setDiastolicBP("");
      setStressLevel("Low");
    } else {
      toast.error("Error saving vitals");

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
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <HeartPulse
            size={28}
            className="text-red-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Health Vitals
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Track your wellness and
            body metrics
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 relative z-10"
      >
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Heart Rate */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Heart Rate (BPM)
            </label>

            <div className="relative">
              <HeartPulse
                size={18}
                className="absolute left-4 top-4 text-red-400"
              />

              <input
                type="number"
                value={heartRate}
                onChange={(e) =>
                  setHeartRate(
                    e.target.value
                  )
                }
                placeholder="72"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-red-500/40"
                required
              />
            </div>
          </div>

          {/* SpO2 */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              SpO₂ (%)
            </label>

            <div className="relative">
              <Activity
                size={18}
                className="absolute left-4 top-4 text-cyan-400"
              />

              <input
                type="number"
                value={spo2}
                onChange={(e) =>
                  setSpo2(
                    e.target.value
                  )
                }
                placeholder="98"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-cyan-500/40"
                required
              />
            </div>
          </div>

          {/* Blood Pressure */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Systolic BP
            </label>

            <div className="relative">
              <ShieldPlus
                size={18}
                className="absolute left-4 top-4 text-yellow-400"
              />

              <input
                type="number"
                value={systolicBP}
                onChange={(e) =>
                  setSystolicBP(
                    e.target.value
                  )
                }
                placeholder="120"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-yellow-500/40"
                required
              />
            </div>
          </div>

          {/* Diastolic */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Diastolic BP
            </label>

            <div className="relative">
              <ShieldPlus
                size={18}
                className="absolute left-4 top-4 text-orange-400"
              />

              <input
                type="number"
                value={diastolicBP}
                onChange={(e) =>
                  setDiastolicBP(
                    e.target.value
                  )
                }
                placeholder="80"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-orange-500/40"
                required
              />
            </div>
          </div>
        </div>

        {/* Stress */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">
            Stress Level
          </label>

          <select
            value={stressLevel}
            onChange={(e) =>
              setStressLevel(
                e.target.value
              )
            }
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500/40"
          >
            <option>Low</option>

            <option>Moderate</option>

            <option>High</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-white"
        >
          {loading
            ? "Saving..."
            : "Save Vitals"}
        </button>
      </form>
    </motion.div>
  );
}