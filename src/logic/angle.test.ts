import { toDegrees, toRadians } from './angle';
import { describe, it, expect } from 'vitest';

describe('angleUtils', () => {
    it('should convert radians to degrees correctly', () => {
        expect(toDegrees(Math.PI)).toBeCloseTo(180, 5);
        expect(toDegrees(Math.PI / 2)).toBeCloseTo(90, 5);
    });

    it('should convert degrees to radians correctly', () => {
        expect(toRadians(180)).toBeCloseTo(Math.PI, 5);
        expect(toRadians(90)).toBeCloseTo(Math.PI / 2, 5);
    });
});