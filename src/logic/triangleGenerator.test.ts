import { describe, it, expect } from 'vitest';
import { getTriangleGenerationFunc } from "./triangleGenerator";
import { classifyTriangle } from "./triangleClassification";

describe("TrianglesClassificationMap", () => {
    describe("Acute & Equilateral Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'acute', side: 'equilateral' });
        
        it("should generate a valid acute equilateral triangle", () => {
            const props = { a: 10 };
            const triangle = f(props);
            
            expect(triangle.a).toBe(10);
            expect(triangle.b).toBe(10);
            expect(triangle.c).toBe(10);
            expect(triangle.A).toBeCloseTo(60, 0);
            expect(triangle.B).toBeCloseTo(60, 0);
            expect(triangle.C).toBeCloseTo(60, 0);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'acute', side: 'equilateral' });
        });
    });
    
    describe("Acute & Isosceles Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'acute', side: 'isosceles' });
        
        it("should generate a valid acute isosceles triangle with B between 45 and 90", () => {
            const props = { a: 10, B: 55};
            const triangle = f(props);
            
            expect(triangle.A).toBeCloseTo(70, 0);
            expect(triangle.B).toBeCloseTo(55, 0);
            expect(triangle.C).toBeCloseTo(55, 0);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'acute', side: 'isosceles' });
        });
        
        it("should accept boundary case at lower bound (B = 46)", () => {
            const props = { a: 10, B: 46 };
            expect(() => f(props)).not.toThrow();
        });
        
        it("should accept boundary case at upper bound (B = 89)", () => {
            const props = { a: 10, B: 89 };
            expect(() => f(props)).not.toThrow();
        });
        
        it("should throw error when B is <= 45", () => {
            const props = { a: 10, B: 45 };
            expect(() => f(props)).toThrow(/Invalid angle for acute isosceles triangle/);
        });
        
        it("should throw error when B is >= 90", () => {
            const props = { a: 10, B: 90 };
            expect(() => f(props)).toThrow(/Invalid angle for acute isosceles triangle/);
        });
    });
    
    describe("Acute & Scalene Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'acute', side: 'scalene' });
        
        it("should generate a valid acute scalene triangle", () => {
            const props = { a: 10, B: 40, C: 60 };
            const triangle = f(props);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'acute', side: 'scalene' });
        });
        
        it("should throw error when B equals C", () => {
            const props = { a: 10, B: 50, C: 50 };
            expect(() => f(props)).toThrow(/Invalid angles for acute scalene triangle/);
        });
        
        it("should throw error when B + C/2 >= 90", () => {
            const props = { a: 10, B: 70, C: 40 }; // 70 + 40/2 = 90
            expect(() => f(props)).toThrow(/Invalid angles for acute scalene triangle/);
        });
        
        it("should throw error when C + B/2 >= 90", () => {
            const props = { a: 10, B: 40, C: 70 }; // 70 + 40/2 = 90
            expect(() => f(props)).toThrow(/Invalid angles for acute scalene triangle/);
        });
        
        it("should throw error when B + C <= 90", () => {
            const props = { a: 10, B: 40, C: 50 }; // 40 + 50 = 90
            expect(() => f(props)).toThrow(/Invalid angles for acute scalene triangle/);
        });
    });
    
    describe("Right & Isosceles Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'right', side: 'isosceles' });
        
        it("should generate a valid right isosceles triangle", () => {
            const props = { a: 10 };
            const triangle = f(props);
            
            expect(triangle.angles[0]).toBe(90);
            expect(triangle.angles[1]).toBe(45);
            expect(triangle.angles[2]).toBe(45);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'right', side: 'isosceles' });
        });
    });
    
    describe("Right & Scalene Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'right', side: 'scalene' });
        
        it("should generate a valid right scalene triangle", () => {
            const props = { a: 10, B: 30, C: 60 };
            const triangle = f(props);
            
            expect(triangle.angles[0]).toBe(90);
            expect(triangle.angles[1]).toBe(30);
            expect(triangle.angles[2]).toBe(60);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'right', side: 'scalene' });
        });
        
        it("should throw error when B equals C", () => {
            const props = { a: 10, B: 45, C: 45 };
            expect(() => f(props)).toThrow(/Invalid angles for right scalene triangle/);
        });
        
        it("should throw error when B + C != 90", () => {
            const props = { a: 10, B: 30, C: 50 }; // 30 + 50 = 80
            expect(() => f(props)).toThrow(/Invalid angles for right scalene triangle/);
        });
    });
    
    describe("Obtuse & Isosceles Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'obtuse', side: 'isosceles' });
        
        it("should generate a valid obtuse isosceles triangle", () => {
            const props = { a: 10, B: 120 };
            const triangle = f(props);
            
            expect(triangle.angles[1]).toBe(120);
            expect(triangle.angles[0]).toBe(30);
            expect(triangle.angles[2]).toBe(30);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'obtuse', side: 'isosceles' });
        });
        
        it("should throw error when B <= 90", () => {
            const props = { a: 10, B: 90 };
            expect(() => f(props)).toThrow(/Invalid angle for obtuse isosceles triangle/);
        });
    });
    
    describe("Obtuse & Scalene Triangle", () => {
        const f = getTriangleGenerationFunc({ angle: 'obtuse', side: 'scalene' });
        
        it("should generate a valid obtuse scalene triangle", () => {
            const props = { a: 10, B: 110, C: 30 };
            const triangle = f(props);
            
            expect(triangle.angles[1]).toBe(110);
            expect(triangle.angles[2]).toBe(30);
            expect(triangle.angles[0]).toBe(40);
            
            const result = classifyTriangle(triangle);
            expect(result).toEqual({ angle: 'obtuse', side: 'scalene' });
        });
        
        it("should throw error when B <= 90", () => {
            const props = { a: 10, B: 90, C: 30 };
            expect(() => f(props)).toThrow(/Invalid angles for obtuse scalene triangle/);
        });
        
        it("should throw error when 180-B = C", () => {
            const props = { a: 10, B: 120, C: 60 }; // 180-120 = 60
            expect(() => f(props)).toThrow(/Invalid angles for obtuse scalene triangle/);
        });
    });
});

describe("getTriangleGenerationFunc", () => {
    it("should throw an error for right equilateral pair", () => {
        expect(() => getTriangleGenerationFunc(
            { angle: 'right', side: 'equilateral' }
        )).toThrow(/Invalid triangle classification/);
    });
    it("should throw an error for obtuse equilateral pair", () => {
        expect(() => getTriangleGenerationFunc(
            { angle: 'obtuse', side: 'equilateral' }
        )).toThrow(/Invalid triangle classification/);
    });
});