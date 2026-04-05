import { SummaryCards } from "@/components/SummaryCards";
import { BalanceChart, SpendingPieChart } from "@/components/Charts";
import { TransactionsTable } from "@/components/TransactionsTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Your financial overview at a glance</p>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BalanceChart />
        <SpendingPieChart />
      </div>
      <TransactionsTable />
    </div>
  );
}
