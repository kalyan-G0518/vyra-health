import DashboardLayout from "@/components/layout/dashboardlayout";

import StatsCards from "@/components/dashboard/statsgrid";

import ActivityChart from "@/components/dashboard/activityChart";

import GoalProgress from "@/components/dashboard/goalprogress";

import SmartInsights from "@/components/dashboard/smartinsights";
import WellnessScore from "@/components/dashboard/wellness";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WellnessScore/>
        <StatsCards />

        <ActivityChart />

        <GoalProgress />

        <SmartInsights />
      </div>
    </DashboardLayout>
  );
}