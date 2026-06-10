import { useEffect, useState } from 'react';
import type { Expense } from '@entities/expense';
import { useUpdateExpense } from '@entities/expense';
import { useMonthStore } from '@features/month-filter';
import { ExpenseFormFields } from '@features/expense-form/ui/ExpenseFormFields';
import {
  toExpensePayload,
  validateExpenseForm,
  type ExpenseFormData,
  type ExpenseFormErrors,
} from '@features/expense-form/lib/validateExpenseForm';
import { Button, Modal } from '@shared/ui';
import styles from './EditExpenseForm.module.scss';

interface EditExpenseFormProps {
  expense: Expense | null;
  onClose: () => void;
}

function toFormData(expense: Expense): ExpenseFormData {
  return {
    amount: String(expense.amount),
    categoryId:
      typeof expense.categoryId === 'string' ? expense.categoryId : expense.categoryId._id,
    date: new Date(expense.date).toISOString().slice(0, 10),
    description: expense.description ?? '',
  };
}

export function EditExpenseForm({ expense, onClose }: EditExpenseFormProps) {
  const month = useMonthStore((state) => state.month);
  const [values, setValues] = useState<ExpenseFormData | null>(null);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const updateExpense = useUpdateExpense(month);

  useEffect(() => {
    if (expense) {
      setValues(toFormData(expense));
      setErrors({});
    }
  }, [expense]);

  if (!expense || !values) return null;

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setValues((prev) => (prev ? { ...prev, [field]: value } : prev));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateExpenseForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await updateExpense.mutateAsync({
      id: expense._id,
      data: toExpensePayload(values),
    });
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose} title="Редагувати витрату">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <ExpenseFormFields values={values} errors={errors} onChange={handleChange} />
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Скасувати
          </Button>
          <Button type="submit" disabled={updateExpense.isPending}>
            {updateExpense.isPending ? 'Збереження...' : 'Зберегти'}
          </Button>
        </div>
        {updateExpense.isError && (
          <p className={styles.error} role="alert">
            Не вдалося оновити витрату
          </p>
        )}
      </form>
    </Modal>
  );
}
