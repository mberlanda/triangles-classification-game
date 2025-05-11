// This module contains the logic for classifying triangles based on their side lengths and angles.
// It exports constraints for each combination of angle and side type.

import Triangle from './triangle';

// AngleType represents the classification of a triangle based on its angles:
// - 'acute': All angles are less than 90 degrees.
// - 'right': One angle is exactly 90 degrees.
// - 'obtuse': One angle is greater than 90 degrees.
export type AngleType = 'acute' | 'right' | 'obtuse';

// SideType represents the classification of a triangle based on its sides:
// - 'equilateral': All sides are of equal length.
// - 'isosceles': Two sides are of equal length.
// - 'scalene': All sides are of different lengths.
export type SideType = 'equilateral' | 'isosceles' | 'scalene';

/**
 * Classifies a triangle based on its angles and sides.
 *
 * @param {Triangle} triangle - The Triangle object to classify.
 * @returns {{ angle: AngleType; side: SideType }} - The classification of the triangle by angle and side type.
 * @throws {Error} If the angles do not sum to 180 degrees or the sides are invalid.
 */
export function classifyTriangle(triangle: Triangle): { angle: AngleType; side: SideType } {
    // Classify the triangle based on its angles
    let angleType: AngleType;

    const angles = triangle.angles;

    // Ensure the sum of the angles is exactly 180 degrees
    if (angles.reduce((sum, angle) => sum + angle, 0) !== 180) {
        throw new Error('The sum of the angles must be 180 degrees.');
    }

    if (angles.some(angle => angle > 90)) {
        angleType = 'obtuse';
    } else if (angles.some(angle => angle === 90)) {
        angleType = 'right';
    } else {
        angleType = 'acute';
    }

    // Classify the triangle based on its sides
    let sideType: SideType;

    const sides = triangle.sides;

    // Ensure all sides are positive numbers
    if (sides.some(side => side <= 0)) {
        throw new Error('The sides must be positive numbers.');
    }

    // Verify the triangle inequality theorem
    // The sum of the lengths of any two sides must be greater than the length of the third side
    const sortedSides = [...sides].sort((a, b) => a - b);
    if (sortedSides[0] + sortedSides[1] <= sortedSides[2]) {
        throw new Error('The sides do not satisfy the triangle inequality.');
    }

    // Count the number of equal sides
    let equalSides = 0;
    if (sortedSides[0] === sortedSides[1]) equalSides++;
    if (sortedSides[1] === sortedSides[2]) equalSides++;
    if (sortedSides[0] === sortedSides[2]) equalSides++;

    // Determine the side type based on the number of equal sides
    if (equalSides === 3) {
        sideType = 'equilateral';
    } else if (equalSides > 0) {
        sideType = 'isosceles';
    } else {
        sideType = 'scalene';
    }

    return { angle: angleType, side: sideType };
}
