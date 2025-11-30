// Generated using EventPanel — https://github.com/eventpanel/eventpanel-cli

export namespace AnalyticsEvents {

  /**
   * User selected an answer option in a test question
   */
  export function dialogScreenTestOptionTapped(): AnalyticsEvent {
    return {
      name: 'Dialog Screen Test Option Tapped',
      parameters: {},
    };
  }
}

export interface AnalyticsEvent {
  name: string;
  parameters: Record<string, unknown>;
}
