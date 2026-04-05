import { Transaction } from "@/data/mockData";

export function exportToCSV(transactions: Transaction[]) {
  const headers = ["Date", "Description", "Amount", "Category", "Type"];
  const rows = transactions.map((t) => [t.date, t.description, t.amount.toFixed(2), t.category, t.type]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
