import * as angleUtils from './angle';

export const TRIANGLE_INPUTS_ERROR = {
    NEGATIVE_VALUES: 'Sides and angles must be positive numbers.',
    INVALID_ANGLE_SUM: 'Invalid angle inputs: sum of angles exceeds 180 degrees',
    INVALID_COMBINATION: 'Invalid combination of properties. Please provide valid sides and/or angles.',
}

/**
 * Represents the properties of a triangle, including its sides and angles.
 * 
 * @interface TriangleProps
 * 
 * @property {number} a - The length of side `a` of the triangle.
 * @property {number} [b] - The optional length of side `b` of the triangle.
 * @property {number} [c] - The optional length of side `c` of the triangle.
 * @property {number} [A] - The optional angle (in degrees) opposite to side `a`.
 * @property {number} [B] - The optional angle (in degrees) opposite to side `b`.
 * @property {number} [C] - The optional angle (in degrees) opposite to side `c`.
 */
interface TriangleProps {
    a: number;
    b?: number;
    c?: number;
    A?: number;
    B?: number;
    C?: number;
}

/**
 * Triangle class representing a triangle with sides and angles.
      C
     / \
  b /   \ a
   /     \
  /_______\
A    c     B
 * 
 */

class Triangle {
    a: number;
    b: number;
    c: number;
    A: number;
    B: number;
    C: number;

    constructor(props: TriangleProps) {
        const validatedProps = this.validateAndBackfillProps(props);
        this.a = validatedProps.a;
        this.b = validatedProps.b!;
        this.c = validatedProps.c!;
        this.A = validatedProps.A!;
        this.B = validatedProps.B!;
        this.C = validatedProps.C!;
    }
    /**
     * Calculates the perimeter of the triangle.
     * 
     * @returns {number} The perimeter of the triangle.
     */
    get perimeter(): number {
        return this.a + this.b + this.c;
    }

    /**
     * Calculates the area of the triangle using Heron's formula.
     * 
     * @returns {number} The area of the triangle.
     */
    get area(): number {
        const s = this.perimeter / 2; // Semi-perimeter
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c)); // Heron's formula
    }

    /**
     * Validates the provided properties of the triangle and backfills missing values.
     * 
     * @param {TriangleProps} props - The properties of the triangle.
     * @returns {TriangleProps} The validated and backfilled properties of the triangle.
     */
    validateAndBackfillProps = (props: TriangleProps) => {
        const { a, b, c, A, B, C } = props;

        // Check if at least one side and one angle are negative and throw an error
        if ((a && a < 0) || (b && b < 0) || (c && c < 0) || (A && A < 0) || (B && B < 0) || (C && C < 0)) {
            throw new Error(TRIANGLE_INPUTS_ERROR.NEGATIVE_VALUES);
        }

        // Check if the sum of all defined angles is greater than 180 degrees and throw an error
        if ((A || 0) + (B || 0) + (C || 0) > 180) {
            throw new Error(TRIANGLE_INPUTS_ERROR.INVALID_ANGLE_SUM);
        }

        if (a != null && b != null && c != null) {
            return this.useLawOfCosines(a, b, c);
        } else if (a != null && b != null && C != null) {
            return this.useLawOfCosinesAndSines(a, C, b);
        } else if (a != null && B != null && C != null) {
            return this.useLawOfSinesASA(a, B, C);
        } else if (A != null && B != null && a != null) {
            return this.useLawOfSinesAAS(A, B, a);
        } else {
            throw new Error(TRIANGLE_INPUTS_ERROR.INVALID_COMBINATION);
        }
    }

    // Law of Cosines: Given 3 sides, find angles
    useLawOfCosines = (a: number, b: number, c: number): TriangleProps => {
        const A = angleUtils.toDegrees(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)));
        const B = angleUtils.toDegrees(Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)));
        const C = 180 - A - B;
        return { a, b, c, A, B, C };
    }

    // Law of Cosines + Sines: Given two sides and included angle
    useLawOfCosinesAndSines = (a: number, C: number, b: number): TriangleProps => {
        const C_rad = angleUtils.toRadians(C);
        const c = Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(C_rad));
        const A = angleUtils.toDegrees(Math.asin((a * Math.sin(C_rad)) / c));
        const B = 180 - A - C;
        return { a, b, c, A, B, C };
    }

    // Law of Sines: Given two angles and one side
    useLawOfSinesASA = (a: number, B: number, C: number): TriangleProps => {
        const A = 180 - B - C;
        const b = (a * Math.sin(angleUtils.toRadians(B))) / Math.sin(angleUtils.toRadians(A));
        const c = (a * Math.sin(angleUtils.toRadians(C))) / Math.sin(angleUtils.toRadians(A));
        return { a, b, c, A, B, C };
    }

    // Law of Sines: Angle-Angle-Side
    useLawOfSinesAAS = (A: number, B: number, a: number): TriangleProps => {
        const C = 180 - A - B;
        const b = (a * Math.sin(angleUtils.toRadians(B))) / Math.sin(angleUtils.toRadians(A));
        const c = (a * Math.sin(angleUtils.toRadians(C))) / Math.sin(angleUtils.toRadians(A));
        return { a, b, c, A, B, C };
    }
}
export default Triangle;