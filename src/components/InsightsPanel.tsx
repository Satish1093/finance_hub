import { useMemo } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/utils/csv";
import { TrendingUp, TrendingDown, PiggyBank, ShoppingBag, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function InsightsPanel() {
  const { transactions } = useFinanceStore();

  const insights = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const thisMonthTx = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });
    const lastMonthTx = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });

    const thisIncome = thisMonthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const thisExpense = thisMonthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const lastIncome = lastMonthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const lastExpense = lastMonthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

    const expenseByCategory = new Map<string, number>();
    for (const t of transactions.filter((t) => t.type === "expense")) {
      expenseByCategory.set(t.category, (expenseByCategory.get(t.category) || 0) + t.amount);
    }
    let highestCategory = "N/A";
    let highestAmount = 0;
    for (const [cat, amt] of expenseByCategory) {
      if (amt > highestAmount) { highestCategory = cat; highestAmount = amt; }
    }

    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

    return {
      highestCategory, highestAmount,
      thisIncome, thisExpense, lastIncome, lastExpense,
      totalSavings: totalIncome - totalExpense,
      incomeChange: lastIncome ? ((thisIncome - lastIncome) / lastIncome * 100) : 0,
      expenseChange: lastExpense ? ((thisExpense - lastExpense) / lastExpense * 100) : 0,
    };
  }, [transactions]);

  const cards = [
    {
      title: "Highest Spending",
      value: insights.highestCategory,
      subtitle: formatCurrency(insights.highestAmount),
      icon: ShoppingBag,
      gradient: "gradient-expense",
      badge: null,
    },
    {
      title: "Total Savings",
      value: formatCurrency(insights.totalSavings),
      subtitle: insights.totalSavings >= 0 ? "You're on track! 🎉" : "Spending exceeds income",
      icon: PiggyBank,
      gradient: insights.totalSavings >= 0 ? "gradient-income" : "gradient-expense",
      badge: null,
    },
    {
      title: "Monthly Income",
      value: formatCurrency(insights.thisIncome),
      subtitle: `vs ${formatCurrency(insights.lastIncome)} last month`,
      icon: TrendingUp,
      gradient: "gradient-income",
      badge: { value: insights.incomeChange, positive: insights.incomeChange >= 0 },
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(insights.thisExpense),
      subtitle: `vs ${formatCurrency(insights.lastExpense)} last month`,
      icon: TrendingDown,
      gradient: "gradient-expense",
      badge: { value: insights.expenseChange, positive: insights.expenseChange <= 0 },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {cards.map((c, i) => (
        <div
          key={c.title}
          className="finance-card relative overflow-hidden animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Gradient accent stripe */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${c.gradient} rounded-t-2xl`} />
          <div className="p-5 pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.title}</p>
                <p className="text-xl font-extrabold text-foreground">{c.value}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{c.subtitle}</p>
                  {c.badge && (
                    <span className={`stat-badge ${
                      c.badge.positive ? "bg-income/10 text-income" : "bg-expense/10 text-expense"
                    }`}>
                      {c.badge.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(c.badge.value).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <div className={`h-11 w-11 rounded-2xl ${c.gradient} flex items-center justify-center shadow-sm`}>
                <c.icon className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
