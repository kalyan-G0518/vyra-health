"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

const workoutOptions = [
  "Running",
  "Gym",
  "Cycling",
  "Yoga",
  "Swimming",
  "Pickleball",
];

export default function ActivityForm() {
  const [workout, setWorkout] =
    useState("Running");

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

      return;
    }

    const { error } =
      await supabase
        .from("activity_logs")
        .upsert(
          [
            {
              user_id: user.id,

              workout_type:
                workout,

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
        "Activity updated!"
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
        <h2 className="text-3xl font-bold mb-2">
          Log Activity
        </h2>

        <p className="text-zinc-400 mb-8">
          Track your movement and
          daily workouts
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Workout Type */}
          <select
            value={workout}
            onChange={(e) =>
              setWorkout(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >
            {workoutOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>

          {/* Steps */}
          <input
            type="number"
            placeholder="Steps"
            value={steps}
            onChange={(e) =>
              setSteps(
                e.target.value
              )
            }
            className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

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
            className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
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
            className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-black"
        >
          {loading
            ? "Saving..."
            : "Save Activity"}
        </button>
      </div>
    </motion.div>
  );
}