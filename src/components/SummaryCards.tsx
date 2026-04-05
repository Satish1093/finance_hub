import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/utils/csv";

export function SummaryCards() {
  const { getBalance, getTotalIncome, getTotalExpenses } = useFinanceStore();
  const balance = getBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : "0";

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      subtitle: `${savingsRate}% savings rate`,
      icon: Wallet,
      gradient: "gradient-balance",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      label: "Total Income",
      value: formatCurrency(income),
      subtitle: "All time earnings",
      icon: TrendingUp,
      gradient: "gradient-income",
      iconBg: "bg-income/10",
      iconColor: "text-income",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(expenses),
      subtitle: "All time spending",
      icon: TrendingDown,
      gradient: "gradient-expense",
      iconBg: "bg-expense/10",
      iconColor: "text-expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {cards.map((c, i) => (
        <div
          key={c.label}
          className="finance-card relative overflow-hidden animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Gradient accent stripe */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${c.gradient} rounded-t-2xl`} />
          <div className="p-5 pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-extrabold text-foreground tracking-tight">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.subtitle}</p>
              </div>
              <div className={`h-11 w-11 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
                <c.icon className={`h-5 w-5 ${c.iconColor}`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
