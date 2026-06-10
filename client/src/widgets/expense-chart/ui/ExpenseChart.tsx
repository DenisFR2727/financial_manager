import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useCategoryAnalytics } from '@entities/expense';
import { useMonthStore } from '@features/month-filter';
import { formatCurrency } from '@shared/lib';
import { Card, CardSkeleton, EmptyState, ErrorState } from '@shared/ui';
import styles from './ExpenseChart.module.scss';

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipDot} style={{ background: item.payload.color }} />
      <span>
        {item.name}: {formatCurrency(item.value)}
      </span>
    </div>
  );
}

export function ExpenseChart() {
  const month = useMonthStore((state) => state.month);
  const { data, isLoading, isError, refetch } = useCategoryAnalytics(month);

  if (isLoading) return <CardSkeleton />;

  if (isError) {
    return (
      <Card title="Витрати по категоріях">
        <ErrorState onRetry={() => refetch()} />
      </Card>
    );
  }

  if (!data?.length) {
    return (
      <Card title="Витрати по категоріях">
        <EmptyState
          title="Немає даних за цей місяць"
          description="Додайте витрати, щоб побачити діаграму"
        />
      </Card>
    );
  }

  return (
    <Card title="Витрати по категоріях">
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.categoryId} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className={styles.legend}>
        {data.map((item) => (
          <li key={item.categoryId} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: item.color }} />
            <span className={styles.legendName}>{item.name}</span>
            <span className={styles.legendValue}>{formatCurrency(item.value)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
