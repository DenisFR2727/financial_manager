import { useMonthlyTotal } from '@entities/expense';
import { useMonthStore } from '@features/month-filter';
import { formatCurrency, formatMonthLabel } from '@shared/lib';
import { Card, CardSkeleton, ErrorState } from '@shared/ui';
import styles from './MonthlySummary.module.scss';

export function MonthlySummary() {
  const month = useMonthStore((state) => state.month);
  const { data, isLoading, isError, refetch } = useMonthlyTotal(month);

  if (isLoading) return <CardSkeleton />;

  if (isError) {
    return (
      <Card title="Підсумок за місяць">
        <ErrorState onRetry={() => refetch()} />
      </Card>
    );
  }

  return (
    <Card title="Підсумок за місяць">
      <p className={styles.period}>{formatMonthLabel(month)}</p>
      <p className={styles.amount}>{formatCurrency(data?.total ?? 0)}</p>
    </Card>
  );
}
