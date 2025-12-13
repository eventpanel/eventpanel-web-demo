import { useEffect } from 'react';
import { 
  AnalyticsService, 
  AnalyticsEvents, 
  Source, 
  Format,
  ConsoleProvider, 
  ApiProvider,
  useAnalytics,
  useEventHistory,
} from './analytics';
import { 
  Header, 
  Footer, 
  EventCard, 
  EventButton, 
  EventConsole 
} from './components';
import './styles/global.css';
import styles from './App.module.css';

// Initialize analytics on app load
const initializeAnalytics = async () => {
  await AnalyticsService.initialize({
    debug: true,
    providers: [
      new ConsoleProvider(),
      new ApiProvider(),
    ],
    onEventTracked: (event, provider) => {
      console.log(`Event "${event.name}" tracked via ${provider}`);
    },
    onError: (error, provider) => {
      console.error(`Analytics error in ${provider}:`, error);
    },
  });
};

function App() {
  const { track } = useAnalytics();
  const { events, clearHistory } = useEventHistory();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Onboarding Events */}
          <EventCard title="Onboarding Events" icon="🚀" variant="cyan">
            <EventButton
              label="Onboarding Started"
              event={AnalyticsEvents.OnboardingEvents.onboardingStarted(Source.Organic)}
              badges={['source']}
              variant="cyan"
              onTrack={track}
            />
            <EventButton
              label="Onboarding Completed"
              event={AnalyticsEvents.OnboardingEvents.onboardingCompleted('user_123', 300)}
              badges={['userId', 'duration']}
              variant="cyan"
              onTrack={track}
            />
            <EventButton
              label="Onboarding Skipped"
              event={AnalyticsEvents.OnboardingEvents.onboardingSkipped(3)}
              badges={['step']}
              variant="cyan"
              onTrack={track}
            />
          </EventCard>

          {/* E-commerce Events */}
          <EventCard title="E-commerce Events" icon="🛒" variant="green">
            <EventButton
              label="Add to Cart"
              event={AnalyticsEvents.ECommerceEvents.addToCart(29.99, 'SKU-123')}
              badges={['price', 'productId']}
              variant="green"
              onTrack={track}
            />
            <EventButton
              label="Checkout Started"
              event={AnalyticsEvents.ECommerceEvents.checkoutStarted({ items: 3, total: 149.99 })}
              badges={['cart']}
              variant="green"
              onTrack={track}
            />
            <EventButton
              label="Purchase Completed"
              event={AnalyticsEvents.ECommerceEvents.purchaseCompleted(['ORD-789'], 149.99)}
              badges={['orderIds', 'total']}
              variant="green"
              onTrack={track}
            />
          </EventCard>

          {/* User Actions */}
          <EventCard title="User Actions" icon="👤" variant="purple">
            <EventButton
              label="Profile Viewed"
              event={AnalyticsEvents.UserActions.profileViewed('usr_abc')}
              badges={['userId']}
              variant="purple"
              onTrack={track}
            />
            <EventButton
              label="Settings Changed"
              event={AnalyticsEvents.UserActions.settingsChanged('notifications', 'enabled')}
              badges={['setting', 'value']}
              variant="purple"
              onTrack={track}
            />
            <EventButton
              label="User Logout"
              event={AnalyticsEvents.UserActions.userLogout('45m')}
              badges={['sessionDuration']}
              variant="purple"
              onTrack={track}
            />
          </EventCard>

          {/* Feature Usage */}
          <EventCard title="Feature Usage" icon="📱" variant="orange">
            <EventButton
              label="Search Used"
              event={AnalyticsEvents.FeatureUsage.searchUsed(42, 'analytics')}
              badges={['resultsCount', 'query']}
              variant="orange"
              onTrack={track}
            />
            <EventButton
              label="Filter Applied"
              event={AnalyticsEvents.FeatureUsage.filterApplied('date_range')}
              badges={['filterType']}
              variant="orange"
              onTrack={track}
            />
            <EventButton
              label="Export Triggered"
              event={AnalyticsEvents.FeatureUsage.exportTriggered(Format.Csv, 1500)}
              badges={['format', 'rowCount']}
              variant="orange"
              onTrack={track}
            />
          </EventCard>

          {/* Console */}
          <EventConsole events={events} onClear={clearHistory} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
