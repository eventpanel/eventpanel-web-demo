import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

interface TrackEventDto {
  name: string;
  parameters: Record<string, unknown>;
}

@Controller()
export class AppController {
  @Get()
  serveDemo(@Res() res: Response) {
    // __dirname = backend/dist, go up 2 levels to project root
    return res.sendFile(join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
  }

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
