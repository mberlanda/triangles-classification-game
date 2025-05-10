import { AngleType, SideType } from '../types/triangle';

export function generateTriangle(): { angle: AngleType; side: SideType } {
  const angles: AngleType[] = ['acutangolo', 'rettangolo', 'ottusangolo'];
  const sides: SideType[] = ['equilatero', 'isoscele', 'scaleno'];
  return {
    angle: angles[Math.floor(Math.random() * angles.length)],
    side: sides[Math.floor(Math.random() * sides.length)]
  };
}