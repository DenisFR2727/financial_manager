import type { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <section className={`${styles.card} ${className}`.trim()}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </section>
  );
}
