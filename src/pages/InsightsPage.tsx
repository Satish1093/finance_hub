import { InsightsPanel } from "@/components/InsightsPanel";
import { BalanceChart, SpendingPieChart } from "@/components/Charts";

export default function InsightsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Insights</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Understand your spending habits and trends</p>
      </div>
      <InsightsPanel />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BalanceChart />
        <SpendingPieChart />
      </div>
    </div>
  );
}
