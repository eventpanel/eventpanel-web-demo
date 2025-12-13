import type { AnalyticsEvent } from './events';
import type { 
  AnalyticsConfig, 
  AnalyticsProvider, 
  TrackedEvent 
} from './types';

/**
 * Central Analytics Service
 * Manages multiple providers and provides a unified interface for tracking
 */
class AnalyticsServiceClass {
  private providers: AnalyticsProvider[] = [];
  private config: AnalyticsConfig | null = null;
  private eventHistory: TrackedEvent[] = [];
  private maxHistorySize = 100;
  private listeners: Set<(event: TrackedEvent) => void> = new Set();

  /**
   * Initialize the analytics service with providers
   */
  async initialize(config: AnalyticsConfig): Promise<void> {
    this.config = config;
    this.providers = config.providers;

    // Initialize all providers in parallel
    await Promise.all(
      this.providers.map(async (provider) => {
        try {
          await provider.initialize({ debug: config.debug });
        } catch (error) {
          config.onError?.(error as Error, provider.name);
          if (config.debug) {
            console.error(`Failed to initialize ${provider.name}:`, error);
          }
        }
      })
    );

    if (config.debug) {
      console.log(
        '%c✨ Analytics Service Initialized',
        'color: #58a6ff; font-weight: bold; font-size: 14px;',
        `\nProviders: ${this.providers.map(p => p.name).join(', ')}`
      );
    }
  }

  /**
   * Track an analytics event across all providers
   */
  async track(event: AnalyticsEvent): Promise<void> {
    const trackedProviders: string[] = [];

    await Promise.all(
      this.providers.map(async (provider) => {
        if (!provider.isReady()) return;

        try {
          await provider.track(event);
          trackedProviders.push(provider.name);
          this.config?.onEventTracked?.(event, provider.name);
        } catch (error) {
          this.config?.onError?.(error as Error, provider.name);
          if (this.config?.debug) {
            console.error(`Failed to track in ${provider.name}:`, error);
          }
        }
      })
    );

    // Store in history
    const trackedEvent: TrackedEvent = {
      ...event,
      timestamp: new Date(),
      providers: trackedProviders,
    };
    
    this.addToHistory(trackedEvent);
    this.notifyListeners(trackedEvent);
  }

  /**
   * Identify the current user
   */
  async identify(userId: string, traits?: Record<string, unknown>): Promise<void> {
    await Promise.all(
      this.providers.map(async (provider) => {
        if (!provider.isReady()) return;

        try {
          await provider.identify(userId, traits);
        } catch (error) {
          this.config?.onError?.(error as Error, provider.name);
        }
      })
    );
  }

  /**
   * Reset all provider sessions
   */
  async reset(): Promise<void> {
    await Promise.all(
      this.providers.map((provider) => provider.reset())
    );
    this.eventHistory = [];
  }

  /**
   * Get event history
   */
  getHistory(): TrackedEvent[] {
    return [...this.eventHistory];
  }

  /**
   * Clear event history
   */
  clearHistory(): void {
    this.eventHistory = [];
    this.notifyListeners(null as unknown as TrackedEvent);
  }

  /**
   * Subscribe to new events
   */
  subscribe(listener: (event: TrackedEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private addToHistory(event: TrackedEvent): void {
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }
  }

  private notifyListeners(event: TrackedEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }
}

// Export singleton instance
export const AnalyticsService = new AnalyticsServiceClass();

