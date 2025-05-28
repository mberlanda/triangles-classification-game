/**
 * Generates a single random value in [min, max] that satisfies the predicate.
 * @param predicate Function to test the value.
 * @param min Minimum value (inclusive).
 * @param max Maximum value (inclusive).
 * @param maxAttempts Maximum number of attempts.
 */
export function generateSingleValue(
    predicate: (v: number) => boolean,
    min: number,
    max: number,
    maxAttempts = 1000
): number {
    for (let i = 0; i < maxAttempts; i++) {
        const v = Math.floor(Math.random() * (max - min + 1)) + min;
        if (predicate(v)) return v;
    }
    throw new Error('Could not generate a value satisfying the predicate');
}

/**
 * Generates a pair of random values in [min, max] that satisfy the predicate.
 * @param predicate Function to test the pair.
 * @param min Minimum value (inclusive).
 * @param max Maximum value (inclusive).
 * @param maxAttempts Maximum number of attempts.
 */
export function generatePair(
    predicate: (v1: number, v2: number) => boolean,
    min: number,
    max: number,
    maxAttempts = 1000
): [number, number] {
    for (let i = 0; i < maxAttempts; i++) {
        const v1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const v2 = Math.floor(Math.random() * (max - min + 1)) + min;
        if (predicate(v1, v2)) return [v1, v2];
    }
    throw new Error('Could not generate a pair satisfying the predicate');
}
