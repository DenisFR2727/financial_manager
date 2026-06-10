import { useState } from 'react';
import { getExpenseCategory, useExpenses, type Expense } from '@entities/expense';
import { DeleteExpenseButton } from '@features/delete-expense';
import { EditExpenseForm } from '@features/edit-expense';
import { useMonthStore } from '@features/month-filter';
import { formatCurrency, formatDate } from '@shared/lib';
import { Button, Card, EmptyState, ErrorState, Skeleton } from '@shared/ui';
import styles from './ExpenseList.module.scss';

function ExpenseListSkeleton() {
  return (
    <Card title="Список витрат">
      <div className={styles.skeletonList}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height="4.5rem" />
        ))}
      </div>
    </Card>
  );
}

export function ExpenseList() {
  const month = useMonthStore((state) => state.month);
  const { data: expenses, isLoading, isError, refetch } = useExpenses(month);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  if (isLoading) return <ExpenseListSkeleton />;

  if (isError) {
    return (
      <Card title="Список витрат">
        <ErrorState onRetry={() => refetch()} />
      </Card>
    );
  }

  if (!expenses?.length) {
    return (
      <Card title="Список витрат">
        <EmptyState
          title="Поки що немає витрат"
          description="Додайте першу витрату за обраний місяць"
        />
      </Card>
    );
  }

  return (
    <>
      <Card title="Список витрат">
        <ul className={styles.list}>
          {expenses.map((expense) => {
            const category = getExpenseCategory(expense);
            const label = category
              ? `${category.name} — ${formatCurrency(expense.amount)}`
              : formatCurrency(expense.amount);

            return (
              <li key={expense._id} className={styles.item}>
                <div className={styles.info}>
                  <div className={styles.header}>
                    {category && (
                      <span
                        className={styles.categoryDot}
                        style={{ background: category.color }}
                        aria-hidden="true"
                      />
                    )}
                    <span className={styles.categoryName}>
                      {category?.name ?? 'Без категорії'}
                    </span>
                    <span className={styles.amount}>{formatCurrency(expense.amount)}</span>
                  </div>
                  <p className={styles.meta}>
                    <time dateTime={expense.date}>{formatDate(expense.date)}</time>
                    {expense.description && (
                      <span className={styles.description}> · {expense.description}</span>
                    )}
                  </p>
                </div>
                <div className={styles.actions}>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setEditingExpense(expense)}
                  >
                    Редагувати
                  </Button>
                  <DeleteExpenseButton expenseId={expense._id} expenseLabel={label} />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      <EditExpenseForm expense={editingExpense} onClose={() => setEditingExpense(null)} />
    </>
  );
}
