import { useMemo } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/utils/csv";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, Area, AreaChart,
} from "recharts";

const PIE_COLORS = [
  "hsl(245, 58%, 51%)", "hsl(152, 55%, 42%)", "hsl(270, 50%, 55%)",
  "hsl(38, 92%, 50%)", "hsl(340, 65%, 55%)", "hsl(190, 70%, 45%)",
  "hsl(25, 85%, 55%)", "hsl(210, 70%, 50%)", "hsl(0, 65%, 55%)",
];

export function BalanceChart() {
  const { transactions } = useFinanceStore();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let balance = 0;
    const map = new Map<string, number>();
    for (const t of sorted) {
      balance += t.type === "income" ? t.amount : -t.amount;
      map.set(t.date, balance);
    }
    return Array.from(map.entries()).map(([date, balance]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      balance,
    }));
  }, [transactions]);

  return (
    <div className="finance-card animate-fade-in overflow-hidden">
      <div className="p-5 pb-2">
        <h3 className="text-sm font-semibold text-foreground">Balance Over Time</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Track your net worth trend</p>
      </div>
      <div className="px-2 pb-4">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-card-hover)",
                  fontSize: 12,
                }}
                formatter={(value: number) => [formatCurrency(value), "Balance"]}
              />
              <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#balanceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function SpendingPieChart() {
  const { transactions } = useFinanceStore();

  const data = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of transactions.filter((t) => t.type === "expense")) {
      map.set(t.category, (map.get(t.category) || 0) + t.amount);
    }
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="finance-card animate-fade-in overflow-hidden">
      <div className="p-5 pb-2">
        <h3 className="text-sm font-semibold text-foreground">Spending by Category</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Where your money goes</p>
      </div>
      <div className="px-2 pb-4">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3} cornerRadius={4}>
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-card-hover)",
                  fontSize: 12,
                }}
                formatter={(value: number) => [formatCurrency(value)]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
