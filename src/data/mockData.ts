export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const CATEGORIES = {
  income: ["Salary", "Freelance", "Investments", "Refunds", "Other Income"],
  expense: ["Food & Dining", "Transport", "Shopping", "Entertainment", "Bills & Utilities", "Health", "Education", "Travel", "Other"],
};

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2025-06-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2025-06-02", description: "Grocery Store", amount: 85.50, category: "Food & Dining", type: "expense" },
  { id: "3", date: "2025-06-03", description: "Uber Ride", amount: 24.00, category: "Transport", type: "expense" },
  { id: "4", date: "2025-06-04", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "5", date: "2025-06-05", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "6", date: "2025-06-06", description: "Electric Bill", amount: 120, category: "Bills & Utilities", type: "expense" },
  { id: "7", date: "2025-06-07", description: "New Sneakers", amount: 160, category: "Shopping", type: "expense" },
  { id: "8", date: "2025-06-08", description: "Gym Membership", amount: 45, category: "Health", type: "expense" },
  { id: "9", date: "2025-06-10", description: "Online Course", amount: 49.99, category: "Education", type: "expense" },
  { id: "10", date: "2025-06-11", description: "Restaurant Dinner", amount: 62.00, category: "Food & Dining", type: "expense" },
  { id: "11", date: "2025-06-12", description: "Stock Dividends", amount: 340, category: "Investments", type: "income" },
  { id: "12", date: "2025-06-14", description: "Gas Station", amount: 55, category: "Transport", type: "expense" },
  { id: "13", date: "2025-06-15", description: "Internet Bill", amount: 60, category: "Bills & Utilities", type: "expense" },
  { id: "14", date: "2025-06-16", description: "Coffee Shop", amount: 12.50, category: "Food & Dining", type: "expense" },
  { id: "15", date: "2025-06-18", description: "Weekend Trip", amount: 350, category: "Travel", type: "expense" },
  { id: "16", date: "2025-06-20", description: "Product Refund", amount: 89, category: "Refunds", type: "income" },
  { id: "17", date: "2025-06-22", description: "Phone Bill", amount: 45, category: "Bills & Utilities", type: "expense" },
  { id: "18", date: "2025-06-24", description: "Book Purchase", amount: 25, category: "Education", type: "expense" },
  { id: "19", date: "2025-06-25", description: "Concert Tickets", amount: 120, category: "Entertainment", type: "expense" },
  { id: "20", date: "2025-06-28", description: "Freelance Bonus", amount: 800, category: "Freelance", type: "income" },
  // Last month data
  { id: "21", date: "2025-05-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "22", date: "2025-05-03", description: "Groceries", amount: 95, category: "Food & Dining", type: "expense" },
  { id: "23", date: "2025-05-05", description: "Electricity", amount: 130, category: "Bills & Utilities", type: "expense" },
  { id: "24", date: "2025-05-08", description: "Online Shopping", amount: 220, category: "Shopping", type: "expense" },
  { id: "25", date: "2025-05-10", description: "Freelance Work", amount: 900, category: "Freelance", type: "income" },
  { id: "26", date: "2025-05-12", description: "Movie Night", amount: 35, category: "Entertainment", type: "expense" },
  { id: "27", date: "2025-05-15", description: "Taxi", amount: 18, category: "Transport", type: "expense" },
  { id: "28", date: "2025-05-20", description: "Health Checkup", amount: 200, category: "Health", type: "expense" },
  { id: "29", date: "2025-05-25", description: "Investments Return", amount: 450, category: "Investments", type: "income" },
  { id: "30", date: "2025-05-28", description: "Dinner Party", amount: 80, category: "Food & Dining", type: "expense" },
];
