"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Apple,
  Droplets,
  Beef,
  Wheat,
  Flame,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function NutritionLogForm() {
  const [mealName, setMealName] =
    useState("");

  const [calories, setCalories] =
    useState("");

  const [protein, setProtein] =
    useState("");

  const [carbs, setCarbs] =
    useState("");

  const [water, setWater] =
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
      .from("nutrition_logs")
      .insert([
        {
          user_id: user.id,
          meal_name: mealName,
          calories: Number(calories),
          protein: Number(protein),
          carbs: Number(carbs),
          water_intake: Number(water),
        },
      ]);

    setLoading(false);

    if (!error) {
      toast.success("Nutrition log saved!");

      setMealName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setWater("");
    } else {
      toast.error(
        "Error saving nutrition log"
      );

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
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <Apple
            size={28}
            className="text-orange-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Nutrition Logger
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Track your meals and
            nutrition intake
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 relative z-10"
      >
        {/* Meal Name */}
        <div>
          <label className="text-sm text-zinc-400 mb-2 block">
            Meal Name
          </label>

          <input
            type="text"
            value={mealName}
            onChange={(e) =>
              setMealName(e.target.value)
            }
            placeholder="Chicken Salad"
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-orange-500/40"
            required
          />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Calories */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Calories
            </label>

            <div className="relative">
              <Flame
                size={18}
                className="absolute left-4 top-4 text-orange-400"
              />

              <input
                type="number"
                value={calories}
                onChange={(e) =>
                  setCalories(
                    e.target.value
                  )
                }
                placeholder="500"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-orange-500/40"
                required
              />
            </div>
          </div>

          {/* Protein */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Protein (g)
            </label>

            <div className="relative">
              <Beef
                size={18}
                className="absolute left-4 top-4 text-red-400"
              />

              <input
                type="number"
                value={protein}
                onChange={(e) =>
                  setProtein(
                    e.target.value
                  )
                }
                placeholder="35"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-red-500/40"
                required
              />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Carbs (g)
            </label>

            <div className="relative">
              <Wheat
                size={18}
                className="absolute left-4 top-4 text-yellow-400"
              />

              <input
                type="number"
                value={carbs}
                onChange={(e) =>
                  setCarbs(
                    e.target.value
                  )
                }
                placeholder="60"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-yellow-500/40"
                required
              />
            </div>
          </div>

          {/* Water */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Water Intake (ml)
            </label>

            <div className="relative">
              <Droplets
                size={18}
                className="absolute left-4 top-4 text-cyan-400"
              />

              <input
                type="number"
                value={water}
                onChange={(e) =>
                  setWater(
                    e.target.value
                  )
                }
                placeholder="1500"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-cyan-500/40"
                required
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-400 transition-all duration-300 rounded-2xl py-4 font-semibold text-black"
        >
          {loading
            ? "Saving..."
            : "Save Nutrition Log"}
        </button>
      </form>
    </motion.div>
  );
}