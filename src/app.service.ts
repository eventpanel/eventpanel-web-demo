import { Injectable } from '@nestjs/common';
import { AnalyticsEvents, Source, Format } from './analytics/events';

@Injectable()
export class AppService {
  getHello(): string {
    // Track onboarding started
    const onboardingEvent = AnalyticsEvents.OnboardingEvents.onboardingStarted(Source.Organic);
    console.log('Event:', onboardingEvent);

    return 'Hello World!';
  }

  trackAddToCart(productId: string, price: number) {
    const event = AnalyticsEvents.ECommerceEvents.addToCart(price, productId);
    console.log('Event:', event);
    return event;
  }

  trackSearch(query: string, resultsCount: number) {
    const event = AnalyticsEvents.FeatureUsage.searchUsed(resultsCount, query);
    console.log('Event:', event);
    return event;
  }

  trackExport(format: Format, rowCount: number) {
    const event = AnalyticsEvents.FeatureUsage.exportTriggered(format, rowCount);
    console.log('Event:', event);
    return event;
  }

  trackOnboardingCompleted(userId: string, duration?: number) {
    const event = AnalyticsEvents.OnboardingEvents.onboardingCompleted(userId, duration);
    console.log('Event:', event);
    return event;
  }

  trackUserLogout(sessionDuration: string) {
    const event = AnalyticsEvents.UserActions.userLogout(sessionDuration);
    console.log('Event:', event);
    return event;
  }
}
