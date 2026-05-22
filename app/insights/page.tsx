
import DashboardLayout from "@/components/layout/dashboardlayout";

import SmartInsights from "@/components/dashboard/smartinsights";

import WeeklySummary from "@/components/dashboard/weeklysummary";

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            AI Insights
          </h1>

          <p className="text-zinc-400 mt-2">
            Personalized wellness analysis
            powered by Vyra AI
          </p>
        </div>

        <SmartInsights />

        <WeeklySummary />
      </div>
    </DashboardLayout>
  );
}