import type { AnalyticsProvider, ProviderConfig } from '../types';
import type { AnalyticsEvent } from '../events';

interface ApiProviderConfig extends ProviderConfig {
  apiUrl: string;
}

/**
 * API provider - sends events to a backend endpoint
 */
export class ApiProvider implements AnalyticsProvider {
  readonly name = 'api';
  private initialized = false;
  private apiUrl = '/api/track';
  private debug = false;

  async initialize(config?: ApiProviderConfig): Promise<void> {
    this.apiUrl = config?.apiUrl ?? '/api/track';
    this.debug = config?.debug ?? false;
    this.initialized = true;

    if (this.debug) {
      console.log(
        '%c🌐 Analytics API Provider Initialized',
        'color: #3fb950; font-weight: bold;',
        { apiUrl: this.apiUrl }
      );
    }
  }

  async track(event: AnalyticsEvent): Promise<void> {
    if (!this.initialized) {
      console.warn('ApiProvider not initialized');
      return;
    }

    await this.sendEvent(event);
  }

  async identify(userId: string, traits?: Record<string, unknown>): Promise<void> {
    if (!this.initialized) return;

    try {
      await fetch(`${this.apiUrl}/identify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, traits }),
      });
    } catch (error) {
      if (this.debug) {
        console.error('Failed to identify user:', error);
      }
    }
  }

  async reset(): Promise<void> {}

  isReady(): boolean {
    return this.initialized;
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (this.debug) {
        console.log('✅ Event sent to API:', event.name);
      }
    } catch (error) {
      if (this.debug) {
        console.error('❌ Failed to send event:', error);
      }
    }
  }
}
