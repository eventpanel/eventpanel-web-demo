import type { AnalyticsEvent } from './events';

/**
 * Interface for analytics providers (Amplitude, Mixpanel, GA, etc.)
 * Implement this interface to add a new analytics provider
 */
export interface AnalyticsProvider {
  /** Unique identifier for the provider */
  readonly name: string;
  
  /** Initialize the provider with configuration */
  initialize(config?: ProviderConfig): Promise<void>;
  
  /** Track an analytics event */
  track(event: AnalyticsEvent): Promise<void>;
  
  /** Identify a user */
  identify(userId: string, traits?: Record<string, unknown>): Promise<void>;
  
  /** Reset the current user session */
  reset(): Promise<void>;
  
  /** Check if provider is ready */
  isReady(): boolean;
}

export interface ProviderConfig {
  apiKey?: string;
  apiUrl?: string;
  debug?: boolean;
  [key: string]: unknown;
}

export interface AnalyticsConfig {
  providers: AnalyticsProvider[];
  debug?: boolean;
  onEventTracked?: (event: AnalyticsEvent, provider: string) => void;
  onError?: (error: Error, provider: string) => void;
}

export interface TrackedEvent extends AnalyticsEvent {
  timestamp: Date;
  providers: string[];
}

