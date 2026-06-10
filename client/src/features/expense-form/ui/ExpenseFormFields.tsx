import { useCategories } from '@entities/category';
import { Input, Select } from '@shared/ui';
import type { ExpenseFormData, ExpenseFormErrors } from '../lib/validateExpenseForm';
import styles from './ExpenseFormFields.module.scss';

interface ExpenseFormFieldsProps {
  values: ExpenseFormData;
  errors: ExpenseFormErrors;
  onChange: (field: keyof ExpenseFormData, value: string) => void;
}

export function ExpenseFormFields({ values, errors, onChange }: ExpenseFormFieldsProps) {
  const { data: categories = [], isLoading, isError } = useCategories();

  const categoryOptions = categories.map((category) => ({
    value: String(category._id),
    label: category.name,
  }));

  const categoryPlaceholder = isLoading
    ? 'Завантаження...'
    : isError
      ? 'Помилка завантаження'
      : categoryOptions.length === 0
        ? 'Немає категорій'
        : 'Оберіть категорію';

  return (
    <div className={styles.fields}>
      <Input
        label="Сума (₴)"
        name="amount"
        type="number"
        min="0"
        step="0.01"
        inputMode="decimal"
        placeholder="0"
        value={values.amount}
        onChange={(event) => onChange('amount', event.target.value)}
        error={errors.amount}
        required
      />

      <Select
        label="Категорія"
        name="categoryId"
        value={values.categoryId}
        onChange={(event) => onChange('categoryId', event.target.value)}
        options={categoryOptions}
        placeholder={categoryPlaceholder}
        error={
          errors.categoryId ??
          (isError ? 'Не вдалося завантажити категорії' : undefined)
        }
        disabled={isLoading || isError || categoryOptions.length === 0}
        required
      />

      <Input
        label="Дата"
        name="date"
        type="date"
        value={values.date}
        onChange={(event) => onChange('date', event.target.value)}
        error={errors.date}
        required
      />

      <Input
        label="Опис"
        name="description"
        type="text"
        placeholder="Необов'язково"
        value={values.description}
        onChange={(event) => onChange('description', event.target.value)}
      />
    </div>
  );
}
