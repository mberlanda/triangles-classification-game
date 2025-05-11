import Triangle, { TRIANGLE_INPUTS_ERROR } from './triangle';
import { describe, it, expect } from 'vitest';

describe('Triangle', () => {
    // To validate the calculation use always the following properties
    //   "A": 36.86989764584401
    //   "B": 53.13010235415598
    //   "C": 90
    //   "a": 3
    //   "b": 4
    //   "c": 5

    describe('when three sides are provided', () => {
        it('should calculate the perimeter correctly', () => {
            const triangle = new Triangle({ a: 3, b: 4, c: 5 });
            expect(triangle.perimeter).toBe(12);
        });

        it('should calculate the area correctly using Heron\'s formula', () => {
            const triangle = new Triangle({ a: 3, b: 4, c: 5 });
            expect(triangle.area).toBeCloseTo(6, 2);
        });

        it('should validate and backfill properties using the law of cosines', () => {
            const triangle = new Triangle({ a: 3, b: 4, c: 5 });
            expect(triangle.A).toBeCloseTo(36.87, 2);
            expect(triangle.B).toBeCloseTo(53.13, 2);
            expect(triangle.C).toBeCloseTo(90, 2);
        });

    });
    describe('when two sides and the included angle are provided -> useLawOfCosinesAndSines', () => {
        it('should calculate the third side and remaining angles correctly', () => {
            const triangle = new Triangle({ a: 3, b: 4, C: 90 });
            expect(triangle.c).toBeCloseTo(5, 2);
            expect(triangle.A).toBeCloseTo(36.87, 2);
            expect(triangle.B).toBeCloseTo(53.13, 2);
        });
    });

    describe('when two angles and the included side are provided -> useLawOfSinesASA', () => {
        it('should calculate the remaining side and angles correctly', () => {
            const triangle = new Triangle({ a: 3, B: 53.13, C: 90 });
            expect(triangle.b).toBeCloseTo(4, 2);
            expect(triangle.c).toBeCloseTo(5, 2);
            expect(triangle.C).toBeCloseTo(90, 2);
        });
    });

    describe('when two angles and a non-included side are provided -> useLawOfSinesAAS', () => {
        it('should calculate the remaining sides and angle correctly', () => {
            const triangle = new Triangle({ A: 36.87, B: 53.13, a: 3 });
            expect(triangle.b).toBeCloseTo(4, 2);
            expect(triangle.c).toBeCloseTo(5, 2);
            expect(triangle.C).toBeCloseTo(90, 2);
        });
    });

    describe('invalid inputs', () => {
        it('should throw an error for missing properties (e.g., only a)', () => {
            expect(() => new Triangle({ a: 3 })).toThrowError(TRIANGLE_INPUTS_ERROR.INVALID_COMBINATION);
        });

        it('should throw an error for ambiguous context (e.g., a, b, A provided)', () => {
            expect(() => new Triangle({ a: 3, b: 4, A: 36.87 })).toThrowError(TRIANGLE_INPUTS_ERROR.INVALID_COMBINATION);
        });

        it('should throw an error for invalid angle inputs (sum of two angles greater than 180)', () => {
            expect(() => new Triangle({ a: 4, B: 110, C: 85 })).toThrowError(TRIANGLE_INPUTS_ERROR.INVALID_ANGLE_SUM);
        });

        it('should throw an error for negative values', () => {
            expect(() => new Triangle({ a: -3, b: 4, c: 5 })).toThrowError(TRIANGLE_INPUTS_ERROR.NON_POSITIVE_VALUES);
        });
    });
});