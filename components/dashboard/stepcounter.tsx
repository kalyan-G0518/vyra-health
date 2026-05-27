"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  Footprints,
  Flame,
  Timer,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function StepCounter() {
  const [steps, setSteps] =
    useState("");

  const [calories, setCalories] =
    useState("");

  const [minutes, setMinutes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {
    if (
      !steps ||
      !calories ||
      !minutes
    ) {
      toast.error(
        "Please fill all fields"
      );

      return;
    }

    setLoading(true);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      toast.error(
        "Please login first"
      );

      setLoading(false);

      return;
    }

    const { error } =
      await supabase
        .from("daily_activity")
        .upsert(
          [
            {
              user_id: user.id,

              steps:
                Number(steps),

              calories_burned:
                Number(calories),

              active_minutes:
                Number(minutes),

              log_date:
                new Date()
                  .toISOString()
                  .split("T")[0],
            },
          ],
          {
            onConflict:
              "user_id,log_date",
          }
        );

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Daily activity updated!"
      );

      setSteps("");
      setCalories("");
      setMinutes("");
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
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2">
          Daily Movement
        </h2>

        <p className="text-zinc-400 mb-8">
          Track steps, calories and
          active minutes
        </p>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Steps */}
          <div className="relative">
            <Footprints
              size={18}
              className="absolute left-4 top-4 text-cyan-400"
            />

            <input
              type="number"
              placeholder="Steps"
              value={steps}
              onChange={(e) =>
                setSteps(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-cyan-500/40 transition-all duration-300"
            />
          </div>

          {/* Calories */}
          <div className="relative">
            <Flame
              size={18}
              className="absolute left-4 top-4 text-orange-400"
            />

            <input
              type="number"
              placeholder="Calories Burned"
              value={calories}
              onChange={(e) =>
                setCalories(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-orange-500/40 transition-all duration-300"
            />
          </div>

          {/* Minutes */}
          <div className="relative">
            <Timer
              size={18}
              className="absolute left-4 top-4 text-emerald-400"
            />

            <input
              type="number"
              placeholder="Active Minutes"
              value={minutes}
              onChange={(e) =>
                setMinutes(
                  e.target.value
                )
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-emerald-500/40 transition-all duration-300"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-black"
        >
          {loading
            ? "Saving..."
            : "Update Daily Activity"}
        </button>
      </div>
    </motion.div>
  );
}