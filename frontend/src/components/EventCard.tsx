import type { ReactNode } from 'react';
import styles from './EventCard.module.css';

interface EventCardProps {
  title: string;
  icon: string;
  variant?: 'cyan' | 'pink' | 'purple' | 'yellow' | 'green' | 'orange';
  children: ReactNode;
}

export function EventCard({ title, icon, variant = 'cyan', children }: EventCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        <div className={`${styles.icon} ${styles[`icon${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
          {icon}
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

