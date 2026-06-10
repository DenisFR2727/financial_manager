import { MonthFilter } from '@features/month-filter';
import { ExpenseChart } from '@widgets/expense-chart';
import { MonthlySummary } from '@widgets/monthly-summary';
import pageStyles from '@shared/ui/Page.module.scss';
import styles from './DashboardPage.module.scss';

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <header>
        <h2 className={pageStyles.title}>Дашборд</h2>
        <p className={pageStyles.subtitle}>
          Огляд витрат за місяць та діаграма по категоріях.
        </p>
      </header>

      <MonthFilter />

      <div className={styles.grid}>
        <MonthlySummary />
        <ExpenseChart />
      </div>
    </div>
  );
}
