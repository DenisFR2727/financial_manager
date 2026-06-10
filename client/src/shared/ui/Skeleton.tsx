import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '1rem', className = '' }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`.trim()}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton} aria-label="Завантаження">
      <Skeleton height="1.25rem" width="60%" />
      <Skeleton height="2rem" width="40%" />
    </div>
  );
}
