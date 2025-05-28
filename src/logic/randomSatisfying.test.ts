import { describe, it, expect } from 'vitest';
import { generateSingleValue, generatePair } from './randomSatisfying';

describe('generateSingleValue', () => {
    it('should generate a value within the range and satisfying the predicate', () => {
        const value = generateSingleValue(v => v % 2 === 0, 2, 10);
        expect(value).toBeGreaterThanOrEqual(2);
        expect(value).toBeLessThanOrEqual(10);
        expect(value % 2).toBe(0);
    });

    it('should throw if no value satisfies the predicate', () => {
        expect(() => generateSingleValue(v => v > 100, 1, 10, 10)).toThrow();
    });

    it('should skip excluded values (e.g. B !== 60)', () => {
        for (let i = 0; i < 20; i++) {
            const value = generateSingleValue(v => v !== 60, 58, 62);
            expect(value).not.toBe(60);
        }
    });

    it('returns a value in range and satisfying the predicate', () => {
        const v = generateSingleValue(x => x % 2 === 0, 2, 10);
        expect(v).toBeGreaterThanOrEqual(2);
        expect(v).toBeLessThanOrEqual(10);
        expect(v % 2).toBe(0);
    });

    it('throws if no value in range satisfies the predicate', () => {
        expect(() => generateSingleValue(x => x > 100, 1, 10, 5)).toThrow('Could not generate a value satisfying the predicate');
    });

    it('works for min == max', () => {
        const v = generateSingleValue(x => x === 7, 7, 7);
        expect(v).toBe(7);
    });

    it('throws for min == max and predicate false', () => {
        expect(() => generateSingleValue(x => false, 7, 7, 2)).toThrow();
    });
});

describe('generatePair', () => {
    it('should generate a pair within the range and satisfying the predicate', () => {
        const [v1, v2] = generatePair((a, b) => a !== b, 1, 10);
        expect(v1).toBeGreaterThanOrEqual(1);
        expect(v1).toBeLessThanOrEqual(10);
        expect(v2).toBeGreaterThanOrEqual(1);
        expect(v2).toBeLessThanOrEqual(10);
        expect(v1).not.toBe(v2);
    });

    it('should throw if no pair satisfies the predicate', () => {
        expect(() => generatePair((a, b) => a + b > 100, 1, 10, 10)).toThrow();
    });

    it('should generate a pair for acute scalene triangle conditions', () => {
        const [B, C] = generatePair(
            (B, C) =>
                B !== C &&
                (B + C / 2) < 90 &&
                (C + B / 2) < 90 &&
                (B + C) > 90,
            1,
            89
        );
        expect(B).not.toBe(C);
        expect((B + C / 2)).toBeLessThan(90);
        expect((C + B / 2)).toBeLessThan(90);
        expect(B + C).toBeGreaterThan(90);
    });

    it('returns a pair in range and satisfying the predicate', () => {
        const [a, b] = generatePair((x, y) => x !== y, 1, 10);
        expect(a).toBeGreaterThanOrEqual(1);
        expect(a).toBeLessThanOrEqual(10);
        expect(b).toBeGreaterThanOrEqual(1);
        expect(b).toBeLessThanOrEqual(10);
        expect(a).not.toBe(b);
    });

    it('throws if no pair in range satisfies the predicate', () => {
        expect(() => generatePair((x, y) => x + y > 100, 1, 10, 5)).toThrow('Could not generate a pair satisfying the predicate');
    });

    it('works for min == max and predicate true', () => {
        const [a, b] = generatePair((x, y) => true, 5, 5);
        expect(a).toBe(5);
        expect(b).toBe(5);
    });

    it('throws for min == max and predicate false', () => {
        expect(() => generatePair((x, y) => false, 5, 5, 2)).toThrow();
    });
});
