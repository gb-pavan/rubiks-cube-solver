// src/cube/moves.ts

import { Face, Color } from './Cube';

type Faces = Record<Face, Color[]>;

// Utility to rotate a 3x3 face clockwise
function rotateFaceMatrix(face: Color[]): Color[] {
  return [
    face[6], face[3], face[0],
    face[7], face[4], face[1],
    face[8], face[5], face[2]
  ];
}

// Rotate face and update adjacent rows
export function rotateFace(faces: Faces, face: Face, clockwise: boolean = true): void {
  if (!clockwise) {
    // Rotate 3 times to simulate counter-clockwise
    rotateFace(faces, face, true);
    rotateFace(faces, face, true);
    rotateFace(faces, face, true);
    return;
  }

  // 1. Rotate the face's own matrix
  faces[face] = rotateFaceMatrix(faces[face]);

  // 2. Rotate the adjacent edges (we handle U face first)
  if (face === 'U') {
    const { F, R, B, L } = faces;

    const temp = [...F.slice(0, 3)];

    // U rotates: F -> R -> B -> L -> F
    F[0] = L[0]; F[1] = L[1]; F[2] = L[2];
    L[0] = B[0]; L[1] = B[1]; L[2] = B[2];
    B[0] = R[0]; B[1] = R[1]; B[2] = R[2];
    R[0] = temp[0]; R[1] = temp[1]; R[2] = temp[2];
  }

  // TODO: Implement D, L, R, F, B face rotations
}
