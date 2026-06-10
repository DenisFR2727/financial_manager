import { useState } from 'react';
import { useCreateExpense } from '@entities/expense';
import { useMonthStore } from '@features/month-filter';
import { ExpenseFormFields } from '@features/expense-form/ui/ExpenseFormFields';
import {
  toExpensePayload,
  validateExpenseForm,
  type ExpenseFormData,
  type ExpenseFormErrors,
} from '@features/expense-form/lib/validateExpenseForm';
import { Button, Card } from '@shared/ui';
import styles from './AddExpenseForm.module.scss';

const emptyForm: ExpenseFormData = {
  amount: '',
  categoryId: '',
  date: new Date().toISOString().slice(0, 10),
  description: '',
};

export function AddExpenseForm() {
  const month = useMonthStore((state) => state.month);
  const [values, setValues] = useState<ExpenseFormData>(emptyForm);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const createExpense = useCreateExpense(month);

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateExpenseForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await createExpense.mutateAsync(toExpensePayload(values));
    setValues({ ...emptyForm, date: values.date });
    setErrors({});
  };

  return (
    <Card title="Додати витрату">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <ExpenseFormFields values={values} errors={errors} onChange={handleChange} />
        <Button type="submit" disabled={createExpense.isPending}>
          {createExpense.isPending ? 'Збереження...' : 'Додати'}
        </Button>
        {createExpense.isError && (
          <p className={styles.error} role="alert">
            Не вдалося зберегти витрату
          </p>
        )}
      </form>
    </Card>
  );
}
