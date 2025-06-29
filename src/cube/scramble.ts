// src/cube/scramble.ts

import { Cube, Face } from './Cube';

const faces: Face[] = ['U', 'D', 'L', 'R', 'F', 'B'];

export function scrambleCube(cube: Cube, movesCount: number = 20): string[] {
  const moves: string[] = [];

  for (let i = 0; i < movesCount; i++) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const clockwise = Math.random() > 0.5;

    cube.rotate(face, clockwise);
    moves.push(`${face}${clockwise ? '' : '\''}`);
  }

  return moves;
}
