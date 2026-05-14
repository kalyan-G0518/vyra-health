import DashboardLayout from "@/components/layout/dashboardlayout";
import StatsGrid from "@/components/dashboard/statsgrid";
import ActivityChart from "@/components/dashboard/activityChart";
import AIInsights from "@/components/dashboard/aiInsights";
import { supabase } from "@/lib/supabase";

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

        <StatsGrid />

        <ActivityChart />

        <AIInsights />
      </div>
    </DashboardLayout>
  );
}