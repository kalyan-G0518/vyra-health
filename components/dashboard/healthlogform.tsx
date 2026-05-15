"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HealthLogForm() {
  const [steps, setSteps] = useState("");
  const [sleepHours, setSleepHours] =
    useState("");

  const [waterIntake, setWaterIntake] =
    useState("");

  const [calories, setCalories] =
    useState("");

  const [mood, setMood] = useState("");

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    const { error } = await supabase
      .from("health_logs")
      .insert([
        {
          user_id: user.id,
          steps: Number(steps),
          sleep_hours: Number(sleepHours),
          water_intake: Number(waterIntake),
          calories: Number(calories),
          mood,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Health log saved!");

      setSteps("");
      setSleepHours("");
      setWaterIntake("");
      setCalories("");
      setMood("");
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">
        Daily Health Log
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Steps"
          value={steps}
          onChange={(e) =>
            setSteps(e.target.value)
          }
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="number"
          placeholder="Sleep Hours"
          value={sleepHours}
          onChange={(e) =>
            setSleepHours(e.target.value)
          }
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="number"
          placeholder="Water Intake (ml)"
          value={waterIntake}
          onChange={(e) =>
            setWaterIntake(e.target.value)
          }
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) =>
            setCalories(e.target.value)
          }
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Mood"
          value={mood}
          onChange={(e) =>
            setMood(e.target.value)
          }
          className="md:col-span-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 transition rounded-xl py-3 font-semibold"
      >
        Save Health Log
      </button>
    </div>
  );
}