/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Global setup for test files
 * Makes Predicate class available globally via globalThis
 */

import { Predicate } from './helpers';

(globalThis as any).Predicate = Predicate;