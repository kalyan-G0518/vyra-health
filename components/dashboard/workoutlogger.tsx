"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import { ChevronDown } from "lucide-react";

import { supabase } from "@/lib/supabase";

const workoutOptions = [
  "Running",
  "Gym",
  "Cycling",
  "Yoga",
  "Swimming",
  "Pickleball",
];

export default function WorkoutLogger() {
  const [workout, setWorkout] =
    useState("Running");

  const [calories, setCalories] =
    useState("");

  const [minutes, setMinutes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {
    if (
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
        .from("workout_logs")
        .insert([
          {
            user_id: user.id,

            workout_type:
              workout,

            calories_burned:
              Number(calories),

            active_minutes:
              Number(minutes),
          },
        ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Workout logged!"
      );

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
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2">
          Workout Logger
        </h2>

        <p className="text-zinc-400 mb-8">
          Log workouts and exercise
          sessions
        </p>

        {/* Form */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Workout Type */}
          <div className="relative">
            <select
              value={workout}
              onChange={(e) =>
                setWorkout(
                  e.target.value
                )
              }
              className="w-full appearance-none bg-black/40 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white outline-none focus:border-emerald-500/40 transition-all duration-300"
            >
              {workoutOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-black text-white"
                  >
                    {option}
                  </option>
                )
              )}
            </select>

            {/* Arrow */}
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-zinc-400">
              <ChevronDown
                size={18}
              />
            </div>
          </div>

          {/* Calories */}
          <input
            type="number"
            placeholder="Calories Burned"
            value={calories}
            onChange={(e) =>
              setCalories(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-500/40 transition-all duration-300"
          />

          {/* Minutes */}
          <input
            type="number"
            placeholder="Active Minutes"
            value={minutes}
            onChange={(e) =>
              setMinutes(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/40 transition-all duration-300"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-8 w-full bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-black"
        >
          {loading
            ? "Saving..."
            : "Log Workout"}
        </button>
      </div>
    </motion.div>
  );
}