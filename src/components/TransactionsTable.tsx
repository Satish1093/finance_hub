import { useState } from "react";
import { Search, ArrowUpDown, Download, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency, exportToCSV } from "@/utils/csv";
import { TransactionDialog } from "@/components/TransactionDialog";
import { Transaction } from "@/data/mockData";

export function TransactionsTable() {
  const {
    role, searchQuery, setSearchQuery, filterType, setFilterType,
    sortField, setSortField, sortOrder, setSortOrder,
    getFilteredTransactions, deleteTransaction,
  } = useFinanceStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const filtered = getFilteredTransactions();
  const isAdmin = role === "admin";

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortOrder("desc"); }
  };

  return (
    <>
      <div className="finance-card animate-fade-in overflow-hidden">
        <div className="p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} records</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8 h-9 w-[180px] text-sm rounded-xl bg-secondary/50 border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
                <SelectTrigger className="h-9 w-[120px] text-sm rounded-xl bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9 rounded-xl border-border/50" onClick={() => exportToCSV(filtered)}>
                <Download className="h-3.5 w-3.5 mr-1" /> CSV
              </Button>
              {isAdmin && (
                <Button size="sm" className="h-9 rounded-xl" onClick={() => { setEditingTx(null); setDialogOpen(true); }}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="px-0">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground text-sm">
              <p className="text-lg mb-1">📭</p>
              No transactions found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("date")}>
                      Date <ArrowUpDown className="inline h-3 w-3 ml-1" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</TableHead>
                    <TableHead className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-muted-foreground" onClick={() => toggleSort("amount")}>
                      Amount <ArrowUpDown className="inline h-3 w-3 ml-1" />
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
                    {isAdmin && <TableHead className="w-[80px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((t) => (
                    <TableRow key={t.id} className="group border-border/30 hover:bg-accent/30 transition-colors">
                      <TableCell className="text-sm text-muted-foreground">{new Date(t.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{t.description}</TableCell>
                      <TableCell className={`text-sm font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs rounded-lg font-medium">{t.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`stat-badge ${
                          t.type === "income" ? "bg-income/10 text-income" : "bg-expense/10 text-expense"
                        }`}>
                          {t.type}
                        </span>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => { setEditingTx(t); setDialogOpen(true); }}>
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-destructive" onClick={() => deleteTransaction(t.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
      <TransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} transaction={editingTx} />
    </>
  );
}
