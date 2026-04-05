import { TransactionsTable } from "@/components/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Transactions</h2>
        <p className="text-sm text-muted-foreground mt-0.5">View and manage all your transactions</p>
      </div>
      <TransactionsTable />
    </div>
  );
}
