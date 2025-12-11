import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

interface TrackEventDto {
  name: string;
  parameters: Record<string, unknown>;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serveDemo(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/track')
  trackEvent(@Body() event: TrackEventDto) {
    // Log the event with nice formatting
    console.log('\n📊 Analytics Event Tracked:');
    console.log('   Event:', event.name);
    console.log('   Params:', JSON.stringify(event.parameters, null, 2));
    console.log('   Time:', new Date().toISOString());
    console.log('─'.repeat(40));
    
    return { success: true, event };
  }
}
