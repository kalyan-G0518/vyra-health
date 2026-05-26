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

export default function SleepInsights() {
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
            .from("sleep_logs")
            .select("*")
            .eq("user_id", user.id);

        if (
          !error &&
          data &&
          data.length > 0
        ) {
          const totalSleep =
            data.reduce(
              (sum, log) =>
                sum +
                Number(
                  log.sleep_hours
                ),
              0
            );

          const count = data.length;

          const avgSleep =
            totalSleep / count;

          const generatedInsights: Insight[] =
            [];

          // Sleep Duration
          generatedInsights.push({
            title:
              "Recovery Duration",
            message:
              avgSleep < 6
                ? "Your average sleep duration appears lower than optimal recovery levels."
                : "Your sleep duration consistency looks healthy recently.",
          });

          // Sleep Quality
          const poorSleepCount =
            data.filter(
              (log) =>
                log.sleep_quality ===
                "Poor"
            ).length;

          generatedInsights.push({
            title:
              "Sleep Quality",
            message:
              poorSleepCount >= 2
                ? "Recent recovery quality trends indicate inconsistent sleep patterns."
                : "Sleep quality remained relatively stable recently.",
          });

          // Bedtime Consistency
          generatedInsights.push({
            title:
              "Bedtime Consistency",
            message:
              "Maintaining consistent sleep timing may improve recovery and energy levels.",
          });

          // Recovery Optimization
          generatedInsights.push({
            title:
              "Recovery Optimization",
            message:
              "Balanced sleep duration and consistent bedtime routines can improve wellness recovery metrics.",
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
            AI Sleep Insights
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Personalized recovery and
            sleep intelligence
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