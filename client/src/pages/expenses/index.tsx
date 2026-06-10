import { AddExpenseForm } from '@features/add-expense';
import { MonthFilter } from '@features/month-filter';
import { ExpenseList } from '@widgets/expense-list';
import pageStyles from '@shared/ui/Page.module.scss';
import styles from './ExpensesPage.module.scss';

export function ExpensesPage() {
  return (
    <div className={styles.page}>
      <header>
        <h2 className={pageStyles.title}>Витрати</h2>
        <p className={pageStyles.subtitle}>
          Список та управління витратами за обраний місяць.
        </p>
      </header>

      <MonthFilter />

      <div className={styles.content}>
        <AddExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
}
