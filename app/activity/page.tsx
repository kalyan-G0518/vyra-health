"use client";

import DashboardLayout from "@/components/layout/dashboardlayout";

import { motion } from "framer-motion";

import ActivityStats from "@/components/dashboard/activitystats";

import ActivityForm from "@/components/dashboard/activityform";

import ActivityHistory from "@/components/dashboard/activityhistory";

import WeeklyActivityChart from "@/components/dashboard/weeklyactivitychart";

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8"
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <h1 className="text-5xl font-bold">
              Activity Tracking
            </h1>

            <p className="text-zinc-400 text-lg mt-3 max-w-2xl leading-8">
              Monitor movement,
              workouts, calories,
              steps and daily
              performance with
              AI-powered wellness
              tracking.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <ActivityStats />


        {/* Weekly Chart */}
        <WeeklyActivityChart />

        {/* Activity History */}
        <ActivityHistory />
      </div>
    </DashboardLayout>
  );
}