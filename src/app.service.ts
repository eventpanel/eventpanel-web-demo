import { Injectable } from '@nestjs/common';
import { AnalyticsEvents } from './analytics/events';

@Injectable()
export class AppService {
  getHello(): string {
    const event = AnalyticsEvents.dialogScreenTestOptionTapped();
    console.log('Event logged:', event);
    return 'Hello World!';
  }
}
