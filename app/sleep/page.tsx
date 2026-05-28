import DashboardLayout from "@/components/layout/dashboardlayout";

import SleepLogForm from "@/components/dashboard/sleeplog";
import SleepChart from "@/components/dashboard/sleepchart";
import SleepHistory from "@/components/dashboard/sleephistory";
import SleepInsights from "@/components/dashboard/sleepinsights";

export default function SleepPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            Sleep Tracking
          </h1>

          <p className="text-zinc-400 mt-2">
            Monitor your recovery,
            sleep quality and bedtime
            consistency
          </p>
        </div>

        {/* Sleep Form */}
        <SleepLogForm />
        <SleepChart/>
        <SleepHistory />
        <SleepInsights/>
      </div>
    </DashboardLayout>
  );
}