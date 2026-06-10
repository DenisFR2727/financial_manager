export const expenseKeys = {
  all: ['expenses'] as const,
  list: (month: string) => [...expenseKeys.all, month] as const,
};

export const analyticsKeys = {
  all: ['analytics'] as const,
  byCategory: (month: string) => [...analyticsKeys.all, 'by-category', month] as const,
  monthlyTotal: (month: string) => [...analyticsKeys.all, 'monthly-total', month] as const,
};
