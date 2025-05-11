import Triangle, { TriangleProps } from "./triangle";
import { AngleType, SideType } from "./triangleClassification";

type ClassificationPair = {
    angle: AngleType;
    side: SideType;
};

type TriangleFunc = (props: TriangleProps) => Triangle;

type TrianglesClassificationMap = Map<string, TriangleFunc>;

export const createClassificationKey = (angle: AngleType, side: SideType): string => {
    return `${angle}-${side}`;
}

export const VALID_CLASSIFICATION_PAIR: ClassificationPair[] = [
    { angle: 'acute', side: 'equilateral' },
    { angle: 'acute', side: 'isosceles' },
    { angle: 'acute', side: 'scalene' },
    { angle: 'right', side: 'isosceles' },
    { angle: 'right', side: 'scalene' },
    { angle: 'obtuse', side: 'isosceles' },
    { angle: 'obtuse', side: 'scalene' },
];

export const VALID_CLASSIFICATIONS_FUNC_MAP: TrianglesClassificationMap = new Map([
    [createClassificationKey('acute', 'equilateral'), ({ a }: TriangleProps): Triangle => new Triangle({ a, b: a, c: a })],
    [createClassificationKey('acute', 'isosceles'), ({ a, B }: TriangleProps): Triangle => {
        // In acute isosceles triangle, the angles are B = C and A, B, C < 90
        // To respect this condition needs to be > 45 and < 90 but not 60
        if (B && B > 45 && B < 90 && B !== 60) {
            return new Triangle({ a, B, C: B });
        }
        throw new Error(`Invalid angle for acute isosceles triangle: ${B}. It should be between 45 and 90 degrees.`);
    }],
    [createClassificationKey('acute', 'scalene'), ({ a, B, C }: TriangleProps): Triangle => {
        // In acute scalene triangle, all angles are < 90 and different from each other
        if (B && C && B !== C && (B + C / 2) < 90 && (C + B / 2) < 90 && (B + C) > 90) {
            return new Triangle({ a, B, C });
        }
        throw new Error(`Invalid angles for acute scalene triangle: B = ${B}, C = ${C}. They should be different and less than 90 degrees.`);
    }],
    [createClassificationKey('right', 'isosceles'), ({ a }: TriangleProps): Triangle => new Triangle({ a, B: 45, C: 45 })],
    [createClassificationKey('right', 'scalene'), ({ a, B, C }: TriangleProps): Triangle => {
        // In right scalene triangle, one angle is 90 and the other two are different
        if (B && C && B !== C && (B + C) === 90) {
            return new Triangle({ a, B, C });
        }
        throw new Error(`Invalid angles for right scalene triangle: B = ${B}, C = ${C}. They should be different and sum to 90 degrees.`);
    }],
    [createClassificationKey('obtuse', 'isosceles'), ({ a, B }: TriangleProps): Triangle => {
        // In obtuse isosceles triangle, the angles are A = C and B > 90
        if (B && B > 90) {
            return new Triangle({ a, B, C: (180 - B) / 2 });
        }
        throw new Error(`Invalid angle for obtuse isosceles triangle: ${B}. It should be greater than 90 degrees.`);
    }],
    [createClassificationKey('obtuse', 'scalene'), ({ a, B, C }: TriangleProps): Triangle => {
        // In obtuse scalene triangle, one angle is > 90 and the other two are different
        if (B && C && B > 90 && (180 - B) !== C) {
            return new Triangle({ a, B, C });
        }
        throw new Error(`Invalid angles for obtuse scalene triangle: B = ${B}, C = ${C}. One angle should be greater than 90 degrees and the other two should be different.`);
    }],
]);

export const getTriangleGenerationFunc = (classificationPair: ClassificationPair): TriangleFunc => {
    // Validate that the classification pair is valid
    const isValid = VALID_CLASSIFICATION_PAIR.some(
        validPair => validPair.angle === classificationPair.angle && validPair.side === classificationPair.side
    );
    
    if (!isValid) {
        throw new Error(`Invalid triangle classification: ${classificationPair.angle}-${classificationPair.side}`);
    }
    
    // Create the key and return the function
    const key = createClassificationKey(classificationPair.angle, classificationPair.side);
    const func = VALID_CLASSIFICATIONS_FUNC_MAP.get(key);
    
    if (!func) {
        throw new Error(`No generation function found for classification: ${key}`);
    }
    
    return func;
};
