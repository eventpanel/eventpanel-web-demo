import { Highlight, themes } from 'prism-react-renderer';
import styles from './CodeSidebar.module.css';

const eventsCode = `// Generated using EventPanel — https://github.com/eventpanel/eventpanel-cli

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
      price: number,
      productId: string,
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
      cart: Record<string, unknown>,
    ): AnalyticsEvent {
      return {
        name: 'Checkout Started',
        parameters: {
          cart: cart,
        },
      };
    }

    export function purchaseCompleted(  
      orderIds: string[],
      total: number,
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
      format: Format | undefined,
      rowCount: number | undefined,
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
      filterType: string | undefined,
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
      resultsCount: number,
      query: string,
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
      userId: string,
      duration: number | undefined,
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
      step: number | undefined,
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
      source: Source,
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
      userId: string,
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
      setting: string,
      value: string,
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
      sessionDuration: string,
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
`;

interface CodeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CodeSidebar({ isOpen, onClose }: CodeSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.fileIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>events.ts</span>
              <span className={styles.filePath}>analytics/events.ts</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className={styles.badgeContainer}>
          <span className={styles.badge}>Generated by EventPanel CLI</span>
        </div>
        
        <div className={styles.codeContainer}>
          <Highlight
            theme={themes.nightOwl}
            code={eventsCode}
            language="typescript"
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre className={styles.pre} style={{ ...style, background: 'transparent' }}>
                <code className={styles.code}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} className={styles.line}>
                      <span className={styles.lineNumber}>{i + 1}</span>
                      <span className={styles.lineContent}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              TypeScript
            </span>
            <span className={styles.stat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
              </svg>
              ~120 lines
            </span>
          </div>
          <a 
            href="https://github.com/nicosantux/eventpanel-cli" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            View on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}

// Toggle button component
interface CodeToggleButtonProps {
  onClick: () => void;
}

export function CodeToggleButton({ onClick }: CodeToggleButtonProps) {
  return (
    <button className={styles.toggleButton} onClick={onClick} aria-label="View generated code">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      <span>View Code</span>
    </button>
  );
}
