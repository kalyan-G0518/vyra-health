"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const insights = [
  {
    title: "Sleep Improvement",
    description:
      "Your sleep consistency improved by 12% this week.",
  },
  {
    title: "Hydration Alert",
    description:
      "You consumed less water than usual yesterday.",
  },
  {
    title: "Activity Trend",
    description:
      "Your average daily steps increased steadily this week.",
  },
];

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8"
    >
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-3 rounded-xl bg-white/10">
          <Brain size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            AI Insights
          </h2>

          <p className="text-zinc-400 text-sm">
            Personalized wellness analysis
          </p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="bg-black/40 border border-white/5 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Sparkles
                size={18}
                className="mt-1 text-emerald-400"
              />

              <div>
                <h3 className="font-semibold mb-1">
                  {insight.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}