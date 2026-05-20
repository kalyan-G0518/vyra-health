import DashboardLayout from "@/components/layout/dashboardlayout";
import DynamicStatsGrid from "@/components/dashboard/dynamicsstats";
import ActivityChart from "@/components/dashboard/activityChart";
import AIInsights from "@/components/dashboard/aiInsights";
import { supabase } from "@/lib/supabase";
import HealthLogForm from "@/components/dashboard/healthlogform";

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

        <AIInsights />
        <HealthLogForm />
      </div>
    </DashboardLayout>
  );
}