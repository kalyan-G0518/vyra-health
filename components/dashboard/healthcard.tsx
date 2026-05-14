"use client";

import { motion } from "framer-motion";

type HealthCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function HealthCard({
  title,
  value,
  change,
}: HealthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-emerald-400/30"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-zinc-400 text-sm">
          {title}
        </h3>

        <span className="text-emerald-400 text-sm">
          {change}
        </span>
      </div>

      <h2 className="text-3xl font-bold relative z-10">
        {value}
      </h2>
    </motion.div>
  );
}