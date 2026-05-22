import DashboardLayout from "@/components/layout/dashboardlayout";

import WeeklyAnalytics from "@/components/dashboard/weeklyanalytics";

import StreakTracker from "@/components/dashboard/streakxxx";

import TrendComparison from "@/components/dashboard/trendcomp";

export default function HealthPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Health Analytics
          </h1>

          <p className="text-zinc-400 mt-2">
            Advanced activity and wellness
            intelligence
          </p>
        </div>

        <WeeklyAnalytics />

        <StreakTracker />

        <TrendComparison />
      </div>
    </DashboardLayout>
  );
}