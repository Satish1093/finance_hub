import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, TransactionType, mockTransactions } from "@/data/mockData";

export type UserRole = "admin" | "viewer";
export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

interface FinanceState {
  transactions: Transaction[];
  role: UserRole;
  searchQuery: string;
  filterType: TransactionType | "all";
  sortField: SortField;
  sortOrder: SortOrder;
  darkMode: boolean;

  setRole: (role: UserRole) => void;
  setSearchQuery: (q: string) => void;
  setFilterType: (type: TransactionType | "all") => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleDarkMode: () => void;

  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  getFilteredTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: "admin",
      searchQuery: "",
      filterType: "all",
      sortField: "date",
      sortOrder: "desc",
      darkMode: false,

      setRole: (role) => set({ role }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterType: (filterType) => set({ filterType }),
      setSortField: (sortField) => set({ sortField }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      toggleDarkMode: () => set((s) => {
        const next = !s.darkMode;
        document.documentElement.classList.toggle("dark", next);
        return { darkMode: next };
      }),

      addTransaction: (t) =>
        set((s) => ({
          transactions: [{ ...t, id: crypto.randomUUID() }, ...s.transactions],
        })),

      editTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      getFilteredTransactions: () => {
        const { transactions, searchQuery, filterType, sortField, sortOrder } = get();
        let filtered = [...transactions];
        if (filterType !== "all") filtered = filtered.filter((t) => t.type === filterType);
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.category.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q) ||
              t.amount.toString().includes(q)
          );
        }
        filtered.sort((a, b) => {
          const mul = sortOrder === "asc" ? 1 : -1;
          if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
          return mul * (a.amount - b.amount);
        });
        return filtered;
      },

      getTotalIncome: () => get().transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
      getTotalExpenses: () => get().transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
      getBalance: () => get().getTotalIncome() - get().getTotalExpenses(),
    }),
    { name: "finance-dashboard-storage" }
  )
);
