export interface ExpenseCategory {
  _id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Expense {
  _id: string;
  amount: number;
  categoryId: ExpenseCategory | string;
  date: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateExpenseDto {
  amount: number;
  categoryId: string;
  date: string;
  description?: string;
}

export interface UpdateExpenseDto {
  amount?: number;
  categoryId?: string;
  date?: string;
  description?: string;
}

export interface CategoryAnalytics {
  categoryId: string;
  name: string;
  color: string;
  value: number;
}

export interface MonthlyTotal {
  total: number;
}
