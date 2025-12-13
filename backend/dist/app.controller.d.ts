import { Response } from 'express';
interface TrackEventDto {
    name: string;
    parameters: Record<string, unknown>;
}
export declare class AppController {
    serveDemo(res: Response): void;
    trackEvent(event: TrackEventDto): {
        success: boolean;
        event: TrackEventDto;
    };
}
export {};
