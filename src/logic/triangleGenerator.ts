import { AngleType, SideType } from '../types/triangle';

// TODO: change bilerplate to code to something correct and in english
// e.g. the sum of the angles should always be 180 degrees etc.
export function generateTriangle(): { angle: AngleType; side: SideType } {
  const angles: AngleType[] = ['acutangolo', 'rettangolo', 'ottusangolo'];
  const sides: SideType[] = ['equilatero', 'isoscele', 'scaleno'];
  return {
    angle: angles[Math.floor(Math.random() * angles.length)],
    side: sides[Math.floor(Math.random() * sides.length)]
  };
}