/**
 * Analytics Events Tests
 * Tests for analytics event matching using predicates
 */

import { custom } from './helpers';

import { describe, it, expect } from '@jest/globals';
import {
  matchAnalyticsEvent,
  equals,
  type ExpectedAnalyticsEvent,
} from './helpers';
import { type AnalyticsEvent } from './analytics/events';

describe('Analytics Events', () => {
  describe('Basic Event Matching', () => {
    it('should match product viewed event with exact values', async () => {
      const actualEvent: AnalyticsEvent = {
        name: 'Add to Cart',
        parameters: {
          price: 15.99,
          productId: 'prod_123',
        },
      };

      const expectedEvent: ExpectedAnalyticsEvent = {
        name: 'Add to Cart',
        parameters: {
          price: custom('>10', (price: number) => price > 10),
          productId: equals('prod_123'),
        },
      };

      await expect(matchAnalyticsEvent(actualEvent, expectedEvent)).resolves.toBe(true);
    });
  });
});
