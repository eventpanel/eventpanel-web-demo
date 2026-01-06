// Generated using EventPanel — https://github.com/eventpanel/eventpanel-cli

export namespace AnalyticsEvents {
  /**
   * Events related to shopping and purchasing actions
   */
  export namespace ECommerceEvents {

    /**
     * Triggered when a user adds a product to the shopping cart
     * @param price Price of the product at the time it was added to the cart
     * @param productId Unique identifier of the product
     */
    export function addToCart(  
      price: Predicate<number>,
      productId: Predicate<string>,
    ): AnalyticsEvent {
      return {
        name: 'Add to Cart',
        parameters: {
          price: price,
          productId: productId,
        },
      };
    }

    /**
     * Triggered when a user starts the checkout process
     * @param cart Items in the cart
     */
    export function checkoutStarted(  
      cart: Predicate<Record<string, unknown>>,
    ): AnalyticsEvent {
      return {
        name: 'Checkout Started',
        parameters: {
          cart: cart,
        },
      };
    }

    export function purchaseCompleted(  
      orderIds: Predicate<string[]>,
      total: Predicate<number>,
    ): AnalyticsEvent {
      return {
        name: 'Purchase Completed',
        parameters: {
          orderIds: orderIds,
          total: total,
        },
      };
    }
  }
  /**
   * Events related to usage of specific product features
   */
  export namespace FeatureUsage {

    /**
     * Triggered when a user exports data
     * @param format File format of the exported data (e.g. CSV, XLSX)
     * @param rowCount Number of rows included in the export
     */
    export function exportTriggered(  
      format: Predicate<Format> | undefined,
      rowCount: Predicate<number> | undefined,
    ): AnalyticsEvent {
      return {
        name: 'Export Triggered',
        parameters: {
          format: format,
          rowCount: rowCount,
        },
      };
    }

    /**
     * Triggered when a user applies a filter
     * @param filterType Type or name of the applied filter
     */
    export function filterApplied(  
      filterType: Predicate<string> | undefined,
    ): AnalyticsEvent {
      return {
        name: 'Filter Applied',
        parameters: {
          filterType: filterType,
        },
      };
    }

    /**
     * Triggered when a user performs a search
     * @param resultsCount Number of results returned for the search query
     * @param query Search query entered by the user
     */
    export function searchUsed(  
      resultsCount: Predicate<number>,
      query: Predicate<string>,
    ): AnalyticsEvent {
      return {
        name: 'Search Used',
        parameters: {
          resultsCount: resultsCount,
          query: query,
        },
      };
    }
  }
  /**
   * Events related to a user’s first-time experience and initial setup in the product
   */
  export namespace OnboardingEvents {

    /**
     * Triggered when a user successfully finishes onboarding
     * @param userId Unique identifier of the user
     * @param duration Total time spent completing onboarding
     */
    export function onboardingCompleted(  
      userId: Predicate<string>,
      duration: Predicate<number> | undefined,
    ): AnalyticsEvent {
      return {
        name: 'Onboarding Completed',
        parameters: {
          userId: userId,
          duration: duration,
        },
      };
    }

    /**
     * Triggered when a user skips onboarding or a specific step
     * @param step The onboarding step that was skipped
     */
    export function onboardingSkipped(  
      step: Predicate<number> | undefined,
    ): AnalyticsEvent {
      return {
        name: 'Onboarding Skipped',
        parameters: {
          step: step,
        },
      };
    }

    /**
     * Triggered when a user begins the onboarding process
     * @param source The source from which the user entered onboarding (e.g. email, ads, organic)
     */
    export function onboardingStarted(  
      source: Predicate<Source>,
    ): AnalyticsEvent {
      return {
        name: 'Onboarding Started',
        parameters: {
          source: source,
        },
      };
    }
  }
  /**
   * Events related to user interactions and account activity
   */
  export namespace UserActions {

    /**
     * Triggered when a user views a profile page
     * @param userId Unique identifier of the user
     */
    export function profileViewed(  
      userId: Predicate<string>,
    ): AnalyticsEvent {
      return {
        name: 'Profile Viewed',
        parameters: {
          userId: userId,
        },
      };
    }

    /**
     * Triggered when a user changes application settings
     * @param setting Name of the setting that was changed
     * @param value New value applied to the setting
     */
    export function settingsChanged(  
      setting: Predicate<string>,
      value: Predicate<string>,
    ): AnalyticsEvent {
      return {
        name: 'Settings Changed',
        parameters: {
          setting: setting,
          value: value,
        },
      };
    }

    /**
     * Triggered when a user logs out of the application
     * @param sessionDuration Duration of the user session before logout
     */
    export function userLogout(  
      sessionDuration: Predicate<string>,
    ): AnalyticsEvent {
      return {
        name: 'User Logout',
        parameters: {
          sessionDuration: sessionDuration,
        },
      };
    }
  }

}

// Custom types for 
export enum Source {
  Email = "email",
  Ads = "ads",
  Organic = "organic"
}
export enum Format {
  Csv = "CSV",
  Xlsx = "XLSX"
}

export interface AnalyticsEvent {
  name: string;
  parameters: Record<string, unknown>;
}
