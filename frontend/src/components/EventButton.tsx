import { useState } from 'react';
import type { AnalyticsEvent } from '../analytics';
import styles from './EventButton.module.css';

interface EventButtonProps {
  label: string;
  event: AnalyticsEvent;
  badges?: string[];
  variant?: 'cyan' | 'pink' | 'purple' | 'yellow' | 'green' | 'orange';
  onTrack: (event: AnalyticsEvent) => Promise<void>;
}

export function EventButton({ 
  label, 
  event, 
  badges = [], 
  variant = 'cyan',
  onTrack 
}: EventButtonProps) {
  const [isTracking, setIsTracking] = useState(false);

  const handleClick = async () => {
    if (isTracking) return;
    
    setIsTracking(true);
    try {
      await onTrack(event);
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      onClick={handleClick}
      disabled={isTracking}
    >
      <span className={styles.label}>{label}</span>
      <div className={styles.badges}>
        {badges.map((badge) => (
          <span key={badge} className={styles.badge}>{badge}</span>
        ))}
      </div>
    </button>
  );
}
