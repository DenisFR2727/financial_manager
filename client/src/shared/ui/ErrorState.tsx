import { Button } from './Button';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Не вдалося завантажити дані',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button type="button" variant="secondary" onClick={onRetry}>
          Спробувати знову
        </Button>
      )}
    </div>
  );
}
