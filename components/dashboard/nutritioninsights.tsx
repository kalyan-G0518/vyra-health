"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Insight = {
  title: string;

  message: string;
};

export default function NutritionInsights() {
  const [insights, setInsights] =
    useState<Insight[]>([]);

  useEffect(() => {
    const generateInsights =
      async () => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) return;

        const { data, error } =
          await supabase
            .from("nutrition_logs")
            .select("*")
            .eq("user_id", user.id);

        if (
          !error &&
          data &&
          data.length > 0
        ) {
          const totalCalories =
            data.reduce(
              (sum, log) =>
                sum + log.calories,
              0
            );

          const totalProtein =
            data.reduce(
              (sum, log) =>
                sum + log.protein,
              0
            );

          const totalCarbs =
            data.reduce(
              (sum, log) =>
                sum + log.carbs,
              0
            );

          const totalWater =
            data.reduce(
              (sum, log) =>
                sum +
                log.water_intake,
              0
            );

          const count = data.length;

          const avgCalories =
            totalCalories / count;

          const avgProtein =
            totalProtein / count;

          const avgCarbs =
            totalCarbs / count;

          const avgWater =
            totalWater / count;

          const generatedInsights: Insight[] =
            [];

          // Calories
          generatedInsights.push({
            title:
              "Calorie Balance",
            message:
              avgCalories > 2800
                ? "Your calorie intake trends slightly above optimal wellness levels."
                : "Calorie intake appears relatively balanced recently.",
          });

          // Protein
          generatedInsights.push({
            title:
              "Protein Intake",
            message:
              avgProtein < 60
                ? "Protein intake may be lower than ideal for recovery and muscle maintenance."
                : "Protein intake consistency looks healthy across recent meals.",
          });

          // Hydration
          generatedInsights.push({
            title: "Hydration",
            message:
              avgWater < 2000
                ? "Hydration levels appear below recommended daily targets."
                : "Hydration consistency remained stable recently.",
          });

          // Carbs
          generatedInsights.push({
            title:
              "Carbohydrate Trends",
            message:
              avgCarbs > 300
                ? "Carbohydrate intake trends slightly higher than balanced nutrition recommendations."
                : "Carbohydrate intake appears relatively controlled.",
          });

          setInsights(
            generatedInsights
          );
        }
      };

    generateInsights();
  }, []);

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
          <BrainCircuit
            size={28}
            className="text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Nutrition Insights
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Personalized nutrition
            intelligence
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-5 relative z-10">
        {insights.map(
          (insight, index) => (
            <motion.div
              key={insight.title}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.01,
              }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/10">
                  <Sparkles
                    size={20}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {insight.title}
                  </h3>

                  <p className="text-zinc-300 leading-7">
                    • {insight.message}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}