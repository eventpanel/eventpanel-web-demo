import { AnalyticsEvent } from "./analytics/events";

export class Predicate<T> {
  constructor(
    public readonly description: string | null,
    public readonly evaluate: (value: T) => boolean | Promise<boolean>
  ) {}

  /**
   * Creates a predicate that checks for exact equality (for Equatable types)
   */
  static equals<T>(value: T): Predicate<T> {
    return new Predicate(
      String(value),
      (actual) => actual === value
    );
  }

  /**
   * Creates a predicate with a custom evaluation function
   */
  static custom<T>(
    description: string | null,
    evaluate: (value: T) => boolean | Promise<boolean>
  ): Predicate<T> {
    return new Predicate(description, evaluate);
  }
}

// ============================================================================
// Convenience factory functions
// ============================================================================

export const equals = <T>(value: T): Predicate<T> => Predicate.equals(value);
export const custom = <T>(
  description: string | null,
  evaluate: (value: T) => boolean | Promise<boolean>
): Predicate<T> => Predicate.custom(description, evaluate);

// ============================================================================
// Expected Analytics Event Type
// ============================================================================

export interface ExpectedAnalyticsEvent {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: Record<string, Predicate<any>>;
}

// ============================================================================
// AnyPredicate Wrapper
// ============================================================================

export class AnyPredicate {
  constructor(
    public readonly description: string | null,
    public readonly evaluate: (value: unknown) => boolean | Promise<boolean>
  ) {}

  static from<T>(predicate: Predicate<T>): AnyPredicate {
    return new AnyPredicate(
      predicate.description,
      async (value: unknown) => {
        try {
          const result = predicate.evaluate(value as T);
          return result instanceof Promise ? await result : result;
        } catch {
          return false;
        }
      }
    );
  }
}

// ============================================================================
// Error Types
// ============================================================================

export interface ComparisonFailure {
  path: string;
  expected: string | null;
  actual: string;
}

export class AnalyticsComparisonError extends Error {
  constructor(public readonly failures: ComparisonFailure[]) {
    const message = `Analytics events did not match:\n\n${failures
      .map((f) => {
        if (f.expected) {
          return `❌ ${f.path} did not satisfy predicate\n   expected: ${f.expected}\n   actual:   ${f.actual}`;
        }
        return `❌ ${f.path} did not satisfy predicate\n   actual:   ${f.actual}`;
      })
      .join('\n')}`;
    super(message);
    this.name = 'AnalyticsComparisonError';
  }
}

// ============================================================================
// Match Function
// ============================================================================

export async function matchAnalyticsEvent(
  actual: AnalyticsEvent,
  expected: ExpectedAnalyticsEvent
): Promise<boolean> {
  const failures: ComparisonFailure[] = [];

  // Check event name
  if (actual.name !== expected.name) {
    failures.push({
      path: 'name',
      expected: expected.name,
      actual: actual.name,
    });
  }

  // Check parameters
  for (const [key, expectedPredicate] of Object.entries(expected.parameters)) {
    const actualValue = actual.parameters[key];

    if (actualValue === undefined) {
      failures.push({
        path: `parameters.${key}`,
        expected: null,
        actual: 'missing',
      });
      continue;
    }

    // Convert typed predicate to AnyPredicate
    const anyPredicate = AnyPredicate.from(expectedPredicate);
    
    // Evaluate the predicate
    const matches = await anyPredicate.evaluate(actualValue);
    
    if (!matches) {
      failures.push({
        path: `parameters.${key}`,
        expected: anyPredicate.description || 'custom predicate',
        actual: String(actualValue),
      });
    }
  }

  if (failures.length > 0) {
    throw new AnalyticsComparisonError(failures);
  }

  return true;
}

// ============================================================================
// Helper Functions
// ============================================================================

export async function expectAnalyticsEvent(
  actual: AnalyticsEvent,
  expected: ExpectedAnalyticsEvent
): Promise<void> {
  try {
    await matchAnalyticsEvent(actual, expected);
  } catch (error) {
    if (error instanceof AnalyticsComparisonError) {
      throw new Error(error.message);
    }
    throw error;
  }
}

// ============================================================================
// Helper to convert AnalyticsEvent with Predicates to ExpectedAnalyticsEvent
// ============================================================================

/**
 * Converts an AnalyticsEvent that contains Predicates in parameters
 * (as returned by generated event builders) to ExpectedAnalyticsEvent
 */
export function toExpectedEvent(event: AnalyticsEvent): ExpectedAnalyticsEvent {
  // Type assertion is safe here because we know the generated events
  // have Predicates in their parameters
  return event as unknown as ExpectedAnalyticsEvent;
}