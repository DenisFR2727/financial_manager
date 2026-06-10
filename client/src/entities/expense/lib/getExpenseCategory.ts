import type { Expense, ExpenseCategory } from '../model/types';

export function getExpenseCategory(expense: Expense): ExpenseCategory | null {
  if (typeof expense.categoryId === 'object' && expense.categoryId !== null) {
    return expense.categoryId;
  }
  return null;
}
