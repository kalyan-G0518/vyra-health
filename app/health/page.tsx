import DashboardLayout from "@/components/layout/dashboardlayout";

import VitalsLogForm from "@/components/dashboard/vitalslog";
import VitalsHistory from "@/components/dashboard/vitalshistory";
import HealthInsights from "@/components/dashboard/healthinsights";

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

        <VitalsLogForm />
        <VitalsHistory />
        <HealthInsights />
      </div>
    </DashboardLayout>
  );
}