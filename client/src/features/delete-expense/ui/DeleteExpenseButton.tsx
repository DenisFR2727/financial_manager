import { useState } from 'react';
import { useDeleteExpense } from '@entities/expense';
import { useMonthStore } from '@features/month-filter';
import { Button, Modal } from '@shared/ui';
import styles from './DeleteExpenseButton.module.scss';

interface DeleteExpenseButtonProps {
  expenseId: string;
  expenseLabel: string;
}

export function DeleteExpenseButton({ expenseId, expenseLabel }: DeleteExpenseButtonProps) {
  const month = useMonthStore((state) => state.month);
  const [isOpen, setIsOpen] = useState(false);
  const deleteExpense = useDeleteExpense(month);

  const handleConfirm = async () => {
    await deleteExpense.mutateAsync(expenseId);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="danger"
        className={styles.button}
        onClick={() => setIsOpen(true)}
        aria-label={`Видалити витрату: ${expenseLabel}`}
      >
        Видалити
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Видалити витрату?">
        <p className={styles.message}>
          Ви впевнені, що хочете видалити «{expenseLabel}»? Цю дію не можна скасувати.
        </p>
        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Скасувати
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            disabled={deleteExpense.isPending}
          >
            {deleteExpense.isPending ? 'Видалення...' : 'Видалити'}
          </Button>
        </div>
        {deleteExpense.isError && (
          <p className={styles.error} role="alert">
            Не вдалося видалити витрату
          </p>
        )}
      </Modal>
    </>
  );
}
