import { useState, useEffect, useCallback } from 'react';
import { AnalyticsService } from '../AnalyticsService';
import type { TrackedEvent } from '../types';

/**
 * Hook for subscribing to analytics event history
 * Useful for debugging and displaying event logs
 */
export function useEventHistory() {
  const [events, setEvents] = useState<TrackedEvent[]>(() => 
    AnalyticsService.getHistory()
  );

  useEffect(() => {
    // Subscribe to new events
    const unsubscribe = AnalyticsService.subscribe(() => {
      setEvents(AnalyticsService.getHistory());
    });

    return unsubscribe;
  }, []);

  const clearHistory = useCallback(() => {
    AnalyticsService.clearHistory();
    setEvents([]);
  }, []);

  return {
    events,
    clearHistory,
  };
}

