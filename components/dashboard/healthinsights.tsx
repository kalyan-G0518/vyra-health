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

export default function HealthInsights() {
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
            .from("health_vitals")
            .select("*")
            .eq("user_id", user.id);

        if (
          !error &&
          data &&
          data.length > 0
        ) {
          const avgHeartRate =
            data.reduce(
              (sum, log) =>
                sum +
                log.heart_rate,
              0
            ) / data.length;

          const avgSpo2 =
            data.reduce(
              (sum, log) =>
                sum + log.spo2,
              0
            ) / data.length;

          const avgSystolic =
            data.reduce(
              (sum, log) =>
                sum +
                log.systolic_bp,
              0
            ) / data.length;

          const highStressCount =
            data.filter(
              (log) =>
                log.stress_level ===
                "High"
            ).length;

          const generatedInsights: Insight[] =
            [];

          // Heart Rate
          generatedInsights.push({
            title:
              "Heart Rate Trends",
            message:
              avgHeartRate > 90
                ? "Your recent heart rate averages appear slightly elevated compared to optimal resting ranges."
                : "Heart rate trends appear relatively stable recently.",
          });

          // SpO2
          generatedInsights.push({
            title:
              "Oxygen Saturation",
            message:
              avgSpo2 < 95
                ? "Blood oxygen levels appear slightly below ideal wellness targets."
                : "SpO₂ levels remained healthy and stable recently.",
          });

          // Blood Pressure
          generatedInsights.push({
            title:
              "Blood Pressure",
            message:
              avgSystolic > 130
                ? "Recent blood pressure readings trend slightly higher than recommended levels."
                : "Blood pressure trends appear balanced recently.",
          });

          // Stress
          generatedInsights.push({
            title:
              "Stress Monitoring",
            message:
              highStressCount >= 2
                ? "Frequent elevated stress levels were detected recently."
                : "Stress levels appear relatively controlled.",
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
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
          <BrainCircuit
            size={28}
            className="text-red-400"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Health Insights
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Personalized wellness and
            vitals intelligence
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
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/10">
                  <Sparkles
                    size={20}
                    className="text-red-400"
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