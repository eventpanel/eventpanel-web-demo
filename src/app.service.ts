import { Injectable } from '@nestjs/common';
import { AnalyticsEvents, Origin } from './analytics/events';

@Injectable()
export class AppService {
  getHello(): string {
    const event = AnalyticsEvents.Onboarding.onboardingEvent(
      Origin.Facebook, 
      1, 
      ['test'], 
      new Date().toISOString()
    );

    console.log('Event logged:', event);
    return 'Hello World!';
  }
}
