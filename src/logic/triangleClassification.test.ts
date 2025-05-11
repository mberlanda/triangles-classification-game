import { describe, it, expect } from 'vitest';
import { classifyTriangle } from './triangleClassification';
import Triangle, { TRIANGLE_INPUTS_ERROR } from './triangle';

describe('classifyTriangle', () => {
    it('should classify an equilateral acute triangle', () => {
        const triangle = new Triangle({ A: 60, B: 60, C: 60, a: 3, b: 3, c: 3 }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'acute', side: 'equilateral' });
    });

    it('should classify an isosceles acute triangle', () => {
        const triangle = new Triangle({ A: 70, B: 70, C: 40, a: 5, b: 5, c: 3 }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'acute', side: 'isosceles' });
    });

    it('should classify a scalene acute triangle', () => {
        const triangle = new Triangle({ A: 50, B: 60, C: 70, a: 4, b: 5, c: 6 }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'acute', side: 'scalene' });
    });

    it('should classify an isosceles right triangle', () => {
        const triangle = new Triangle({ A: 90, B: 45, C: 45, a: 5, b: 5, c: Math.sqrt(50) }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'right', side: 'isosceles' });
    });

    it('should classify a scalene right triangle', () => {
        const triangle = new Triangle({ A: 90, B: 60, C: 30, a: 3, b: 4, c: 5 }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'right', side: 'scalene' });
    });

    it('should classify an isosceles obtuse triangle', () => {
        const triangle = new Triangle({ a: 5, A: 30, B: 30 }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'obtuse', side: 'isosceles' });
    });

    it('should classify a scalene obtuse triangle', () => {
        const triangle = new Triangle({ a: 7, A: 120, B: 40 }); // angles: A, B, C; sides: a, b, c
        const result = classifyTriangle(triangle);
        expect(result).toEqual({ angle: 'obtuse', side: 'scalene' });
    });

    it('should throw an error if angles do not sum to 180 degrees', () => {
        expect(() => {
            const triangle = new Triangle({ A: 90, B: 45, C: 50, a: 3, b: 4, c: 5 }); // angles: A, B, C; sides: a, b, c
            classifyTriangle(triangle)
        }).toThrow(TRIANGLE_INPUTS_ERROR.INVALID_ANGLE_SUM);
    });

    it('should throw an error if any side is non-positive', () => {
        expect(() => {
            const triangle = new Triangle({  a: -1, b: 3, c: 0 }); // angles: A, B, C; sides: a, b, c
            classifyTriangle(triangle)
        }).toThrow(TRIANGLE_INPUTS_ERROR.NON_POSITIVE_VALUES);
    });

    it('should throw an error if sides do not satisfy the triangle inequality', () => {
        const triangle = new Triangle({ A: 60, B: 60, C: 60, a: 1, b: 2, c: 3 }); // angles: A, B, C; sides: a, b, c
        expect(() => classifyTriangle(triangle)).toThrow('The sides do not satisfy the triangle inequality.');
    });
});
