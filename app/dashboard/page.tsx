import DashboardLayout from "@/components/layout/dashboardlayout";

import StatsCards from "@/components/dashboard/statsgrid";

import ActivityChart from "@/components/dashboard/activityChart";

import GoalProgress from "@/components/dashboard/goalprogress";

import SmartInsights from "@/components/dashboard/smartinsights";

import WellnessScore from "@/components/dashboard/wellness";

import DailyRings from "@/components/dashboard/dailyrings";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Grid */}
        <div className="grid xl:grid-cols-2 gap-8">
          <WellnessScore />

          <DailyRings />
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Charts */}
        <ActivityChart />

        {/* Goals */}
        <GoalProgress />

        {/* AI Insights */}
        <SmartInsights />
      </div>
    </DashboardLayout>
  );
}