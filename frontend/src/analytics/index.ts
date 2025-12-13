// Core
export { AnalyticsService } from './AnalyticsService';
export { AnalyticsEvents, Source, Format } from './events';
export type { AnalyticsEvent } from './events';

// Types
export type { 
  AnalyticsProvider, 
  AnalyticsConfig, 
  ProviderConfig,
  TrackedEvent 
} from './types';

// Providers
export { ConsoleProvider, ApiProvider } from './providers';

// Hooks
export { useAnalytics, useEventHistory } from './hooks';

