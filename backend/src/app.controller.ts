import { Controller, Post, Body } from '@nestjs/common';

interface TrackEventDto {
  name: string;
  parameters: Record<string, unknown>;
}

@Controller()
export class AppController {
  @Post('api/track')
  trackEvent(@Body() event: TrackEventDto) {
    console.log('\n📊 Analytics Event Tracked:');
    console.log('   Event:', event.name);
    console.log('   Params:', JSON.stringify(event.parameters, null, 2));
    console.log('   Time:', new Date().toISOString());
    console.log('─'.repeat(40));

    return { success: true, event };
  }
}
