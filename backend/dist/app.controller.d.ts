interface TrackEventDto {
    name: string;
    parameters: Record<string, unknown>;
}
export declare class AppController {
    trackEvent(event: TrackEventDto): {
        success: boolean;
        event: TrackEventDto;
    };
}
export {};
