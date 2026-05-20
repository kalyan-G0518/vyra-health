import DashboardLayout from "@/components/layout/dashboardlayout";
import DynamicStatsGrid from "@/components/dashboard/dynamicsstats";
import ActivityChart from "@/components/dashboard/activityChart";
import { supabase } from "@/lib/supabase";
import HealthLogForm from "@/components/dashboard/healthlogform";
import RecentLogs from "@/components/dashboard/recentlogs";
import SmartInsights from "@/components/dashboard/smartinsights";
import GoalProgress from "@/components/dashboard/goalprogress";
import WeeklyAnalytics from "@/components/dashboard/weeklyanalytics";
import StreakTracker from "@/components/dashboard/streakxxx";

export default function Home() {

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Welcome Back, Kalyan 👋
        </h1>

        <p className="text-zinc-400">
          Here’s your AI-powered health overview.
        </p>

        <DynamicStatsGrid />

        <ActivityChart />
        <GoalProgress />
        <SmartInsights/>

    
        <HealthLogForm />
        <StreakTracker/>
        <WeeklyAnalytics/>
        <RecentLogs />
      </div>
    </DashboardLayout>
  );
}