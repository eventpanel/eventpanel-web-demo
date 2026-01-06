/**
 * Global type declarations for test files
 * Makes Predicate class available globally without imports
 */

import type { Predicate as PredicateClass } from './helpers';

declare global {
    // Конструктор глобального класса с дженериком
    var Predicate: {
        new <T>(
            description: string | null,
            evaluate: (value: T) => boolean | Promise<boolean>
        ): PredicateClass<T>;
        
        // Статические методы класса Predicate
        equals<T>(value: T): PredicateClass<T>;
        custom<T>(description: string | null, fn: (value: T) => boolean | Promise<boolean>): PredicateClass<T>;
    };

    // Тип для использования в type annotations
    type Predicate<T> = PredicateClass<T>;
}

export {};