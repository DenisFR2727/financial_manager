export interface ExpenseFormData {
  amount: string;
  categoryId: string;
  date: string;
  description: string;
}

export interface ExpenseFormErrors {
  amount?: string;
  categoryId?: string;
  date?: string;
}

export function validateExpenseForm(data: ExpenseFormData): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {};
  const amount = Number(data.amount);

  if (!data.amount || Number.isNaN(amount) || amount <= 0) {
    errors.amount = 'Введіть додатне число';
  }

  if (!data.categoryId) {
    errors.categoryId = 'Оберіть категорію';
  }

  if (!data.date) {
    errors.date = 'Вкажіть дату';
  }

  return errors;
}

export function toExpensePayload(data: ExpenseFormData) {
  return {
    amount: Number(data.amount),
    categoryId: data.categoryId,
    date: new Date(data.date).toISOString(),
    description: data.description.trim() || undefined,
  };
}
