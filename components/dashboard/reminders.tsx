"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Bell,
  Moon,
  Activity,
  Flame,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Reminder = {
  title: string;

  message: string;

  icon: React.ReactNode;
};

export default function WellnessReminders() {
  const [reminders, setReminders] =
    useState<Reminder[]>([]);

  useEffect(() => {
    generateReminders();
  }, []);

  const generateReminders =
    async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      // Today's activity
      const { data: activity } =
        await supabase
          .from("daily_activity")
          .select("*")
          .eq("user_id", user.id)
          .eq("log_date", today)
          .single();

      // Today's sleep
      const { data: sleep } =
        await supabase
          .from("sleep_logs")
          .select("*")
          .eq("user_id", user.id)
          .eq("log_date", today)
          .single();

      const generated:
        Reminder[] = [];

      // Missing sleep
      if (!sleep) {
        generated.push({
          title:
            "Sleep Reminder",
          message:
            "You haven't logged your sleep today. Recovery tracking improves wellness insights.",
          icon: (
            <Moon className="text-violet-400" />
          ),
        });
      }

      // Missing activity
      if (!activity) {
        generated.push({
          title:
            "Movement Reminder",
          message:
            "No activity recorded today. Even light movement improves recovery and consistency.",
          icon: (
            <Activity className="text-cyan-400" />
          ),
        });
      }

      // Low steps
      if (
        activity &&
        activity.steps < 3000
      ) {
        generated.push({
          title:
            "Low Activity Detected",
          message:
            "Your movement today is below your average. Consider a short walk or stretch break.",
          icon: (
            <Flame className="text-orange-400" />
          ),
        });
      }

      // Default
      if (
        generated.length === 0
      ) {
        generated.push({
          title:
            "You're On Track",
          message:
            "All wellness logs are updated today. Keep maintaining your consistency.",
          icon: (
            <Bell className="text-emerald-400" />
          ),
        });
      }

      setReminders(generated);
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
      className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-white/10 rounded-3xl p-8"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Smart Reminders
            </h2>

            <p className="text-zinc-400 mt-2">
              Personalized wellness
              nudges based on your
              daily activity and
              recovery trends
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Bell className="text-orange-400" />
          </div>
        </div>

        {/* Reminder Cards */}
        <div className="space-y-5">
          {reminders.map(
            (
              reminder,
              index
            ) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="mt-1">
                  {
                    reminder.icon
                  }
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {
                      reminder.title
                    }
                  </h3>

                  <p className="text-zinc-400 mt-2 leading-7">
                    {
                      reminder.message
                    }
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}