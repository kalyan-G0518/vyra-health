import DashboardLayout from "@/components/layout/dashboardlayout";

import StatsCards from "@/components/dashboard/statsgrid";

import ActivityChart from "@/components/dashboard/activityChart";
import RecoveryStatus from "@/components/dashboard/recoverystatus";
import GoalProgress from "@/components/dashboard/goalprogress";
import DashboardHero from "@/components/dashboard/dashboardhero";
import SmartInsights from "@/components/dashboard/smartinsights";
import StreakCard from "@/components/dashboard/streakcard";
import WellnessScore from "@/components/dashboard/wellness";
import AICoach from "@/components/dashboard/aicoach";
import DailyRings from "@/components/dashboard/dailyrings";
import AIInsights from "@/components/dashboard/aiInsights";

import WellnessReminders from "@/components/dashboard/reminders";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Grid */}
        <DashboardHero/>
        <RecoveryStatus/>
        <div className="grid xl:grid-cols-2 gap-8">
      
          <StreakCard />

          <DailyRings />
        </div>


        {/* Charts */}

        {/* Goals */}
        <GoalProgress />

        {/* AI Insights */}
        <SmartInsights />
        <AIInsights/>
        <AICoach/>
        <WellnessReminders />
      </div>
    </DashboardLayout>
  );
}