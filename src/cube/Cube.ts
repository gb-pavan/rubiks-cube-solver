// src/cube/Cube.ts

import { rotateFace } from './moves';

export type Face = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';
export type Color = 'w' | 'y' | 'o' | 'r' | 'g' | 'b';

const FACE_ORDER: Face[] = ['U', 'D', 'L', 'R', 'F', 'B'];

export class Cube {
  private faces: Record<Face, Color[]>;

  constructor() {
    this.faces = {
      U: Array(9).fill('w'), // white
      D: Array(9).fill('y'), // yellow
      L: Array(9).fill('o'), // orange
      R: Array(9).fill('r'), // red
      F: Array(9).fill('g'), // green
      B: Array(9).fill('b'), // blue
    };
  }

  /** Returns a deep copy of the face data */
  public getState(): Record<Face, Color[]> {
    return JSON.parse(JSON.stringify(this.faces));
  }

  /** For display with getCubeSvg: returns a flat string of all faces */
  public getFlatColorsString(): string {
    return FACE_ORDER.map(face => this.faces[face].join('')).join('');
  }

  /** Resets cube to solved state */
  public reset(): void {
    this.constructor(); // Reinitialize
  }

  /** Sets cube state manually (for testing/debugging) */
  public setState(state: Record<Face, Color[]>): void {
    this.faces = JSON.parse(JSON.stringify(state));
  }

  /** Debug: print all faces in console */
  public print(): void {
    for (const face of FACE_ORDER) {
      console.log(`${face}: ${this.faces[face].join('')}`);
    }
  }

  /** Placeholder for rotation (to be implemented in moves.ts) */
//   public rotate(face: Face, clockwise: boolean = true): void {
//     // We'll delegate to `rotateFace(this.faces, face, clockwise)`
//     throw new Error('rotate() not implemented yet. Will be in moves.ts');
//   }
public rotate(face: Face, clockwise: boolean = true): void {
  rotateFace(this.faces, face, clockwise);
}
}
