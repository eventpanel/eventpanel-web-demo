import { useCallback } from 'react';
import { AnalyticsService } from '../AnalyticsService';
import type { AnalyticsEvent } from '../events';

/**
 * Hook for tracking analytics events
 * Provides a clean interface for components to send events
 */
export function useAnalytics() {
  const track = useCallback(async (event: AnalyticsEvent) => {
    await AnalyticsService.track(event);
  }, []);

  const identify = useCallback(async (userId: string, traits?: Record<string, unknown>) => {
    await AnalyticsService.identify(userId, traits);
  }, []);

  const reset = useCallback(async () => {
    await AnalyticsService.reset();
  }, []);

  return {
    track,
    identify,
    reset,
  };
}

