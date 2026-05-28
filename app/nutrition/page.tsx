import DashboardLayout from "@/components/layout/dashboardlayout";

import NutritionLogForm from "@/components/dashboard/nutritionlog";
import NutritionHistory from "@/components/dashboard/nutritionhistory";
import NutritionAnalytics from "@/components/dashboard/nutritionanalytics";
import NutritionInsights from "@/components/dashboard/nutritioninsights";

export default function NutritionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            Nutrition Tracking
          </h1>

          <p className="text-zinc-400 mt-2">
            Monitor your meals, calories,
            hydration and nutrition intake
          </p>
        </div>

        {/* Nutrition Form */}
        <NutritionLogForm />
        
        <NutritionAnalytics />
        <NutritionInsights/>
        <NutritionHistory />
      </div>
    </DashboardLayout>
  );
}