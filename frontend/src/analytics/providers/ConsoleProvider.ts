import type { AnalyticsProvider, ProviderConfig } from '../types';
import type { AnalyticsEvent } from '../events';

/**
 * Console provider for debugging - logs all events to browser console
 */
export class ConsoleProvider implements AnalyticsProvider {
  readonly name = 'console';
  private initialized = false;
  private debug = true;

  async initialize(config?: ProviderConfig): Promise<void> {
    this.debug = config?.debug ?? true;
    this.initialized = true;
    
    if (this.debug) {
      console.log(
        '%c📊 Analytics Console Provider Initialized',
        'color: #3fb950; font-weight: bold;'
      );
    }
  }

  async track(event: AnalyticsEvent): Promise<void> {
    if (!this.initialized) {
      console.warn('ConsoleProvider not initialized');
      return;
    }

    console.group(
      `%c📈 ${event.name}`,
      'color: #58a6ff; font-weight: bold;'
    );
    console.log('%cParameters:', 'color: #bc8cff;', event.parameters);
    console.log('%cTimestamp:', 'color: #8b949e;', new Date().toISOString());
    console.groupEnd();
  }

  async identify(userId: string, traits?: Record<string, unknown>): Promise<void> {
    if (this.debug) {
      console.log(
        '%c👤 User Identified:',
        'color: #f0883e; font-weight: bold;',
        { userId, traits }
      );
    }
  }

  async reset(): Promise<void> {
    if (this.debug) {
      console.log(
        '%c🔄 Analytics session reset',
        'color: #f778ba; font-weight: bold;'
      );
    }
  }

  isReady(): boolean {
    return this.initialized;
  }
}

