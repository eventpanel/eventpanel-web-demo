import { useRef, useEffect } from 'react';
import type { TrackedEvent } from '../analytics';
import styles from './EventConsole.module.css';

interface EventConsoleProps {
  events: TrackedEvent[];
  onClear: () => void;
}

export function EventConsole({ events, onClear }: EventConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [events]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.dots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.title}>Event Console</span>
          <span className={styles.count}>{events.length} events</span>
        </div>
        <button className={styles.clearBtn} onClick={onClear}>
          Clear
        </button>
      </div>
      
      <div className={styles.console} ref={consoleRef}>
        {events.length === 0 ? (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>📊</span>
            <span>Click any event button to see type-safe analytics in action...</span>
          </div>
        ) : (
          events.map((event, index) => (
            <div 
              key={`${event.timestamp.getTime()}-${index}`} 
              className={styles.line}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className={styles.timestamp}>{formatTime(event.timestamp)}</span>
              <span className={styles.eventName}>{event.name}</span>
              <span className={styles.params}>
                {JSON.stringify(event.parameters)}
              </span>
              <span className={styles.providers}>
                {event.providers.map(p => (
                  <span key={p} className={styles.providerTag}>{p}</span>
                ))}
              </span>
            </div>
          ))
        )}
      </div>
      
      <div className={styles.hint}>
        <span className={styles.hintIcon}>💡</span>
        <code>analytics.track(AnalyticsEvents.Category.eventName(params))</code>
      </div>
    </div>
  );
}

