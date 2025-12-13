/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AnalyticsProvider, ProviderConfig } from '../types';
import type { AnalyticsEvent } from '../events';

interface ApiProviderConfig extends ProviderConfig {
  apiUrl: string;
  batchSize?: number;
  flushInterval?: number;
}

/**
 * API provider - sends events to a backend endpoint
 * Supports batching and retry logic
 */
export class ApiProvider implements AnalyticsProvider {
  readonly name = 'api';
  private initialized = false;
  private apiUrl = '/api/track';
  private debug = false;
  private queue: AnalyticsEvent[] = [];
  private _batchSize = 10;
  private flushInterval = 5000;
  private _flushTimer: ReturnType<typeof setTimeout> | null = null;

  async initialize(config?: ApiProviderConfig): Promise<void> {
    this.apiUrl = config?.apiUrl ?? '/api/track';
    this.debug = config?.debug ?? false;
    this._batchSize = config?.batchSize ?? 10;
    this.flushInterval = config?.flushInterval ?? 5000;
    this.initialized = true;

    // Start periodic flush
    this.startFlushTimer();

    // Flush on page unload
    window.addEventListener('beforeunload', () => this.flush());

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

    // For demo purposes, send immediately (you can enable batching)
    await this.sendEvent(event);
    
    // For batching, uncomment below:
    // this.queue.push(event);
    // if (this.queue.length >= this._batchSize) {
    //   await this.flush();
    // }
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

  async reset(): Promise<void> {
    this.queue = [];
  }

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
      // Could implement retry logic here
    }
  }

  private async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch(`${this.apiUrl}/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      // Put events back in queue on failure
      this.queue = [...events, ...this.queue];
      if (this.debug) {
        console.error('Failed to flush events:', error);
      }
    }
  }

  private startFlushTimer(): void {
    this._flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }
}

