// src/cube/solver.ts

import { Cube } from './Cube';

export function solveCubeFromScramble(cube: Cube, scrambleMoves: string[]): string[] {
  const reverseMoves: string[] = [];

  // Apply inverse of each move in reverse order
  for (let i = scrambleMoves.length - 1; i >= 0; i--) {
    const move = scrambleMoves[i];
    const face = move[0] as any;
    const clockwise = !move.includes("'");

    cube.rotate(face, !clockwise); // Apply inverse
    reverseMoves.push(`${face}${!clockwise ? '' : '\''}`); // Track inverse
  }

  return reverseMoves;
}
