import { formatMonthLabel } from '@shared/lib';
import { useMonthStore } from '../model/monthStore';
import styles from './MonthFilter.module.scss';

export function MonthFilter() {
  const { month, setMonth } = useMonthStore();

  return (
    <div className={styles.filter}>
      <label className={styles.label} htmlFor="month-filter">
        Місяць: <span className={styles.monthLabel}>{formatMonthLabel(month)}</span>
      </label>
      <input
        id="month-filter"
        type="month"
        value={month}
        onChange={(event) => setMonth(event.target.value)}
        className={styles.input}
        aria-label="Оберіть місяць"
      />
    </div>
  );
}
