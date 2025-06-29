// // src/cube/moves.ts

// import { Face, Color } from './Cube';

// type Faces = Record<Face, Color[]>;

// // Utility to rotate a 3x3 face clockwise
// function rotateFaceMatrix(face: Color[]): Color[] {
//   return [
//     face[6], face[3], face[0],
//     face[7], face[4], face[1],
//     face[8], face[5], face[2]
//   ];
// }

// // Rotate face and update adjacent rows
// export function rotateFace(faces: Faces, face: Face, clockwise: boolean = true): void {
//   if (!clockwise) {
//     // Rotate 3 times to simulate counter-clockwise
//     rotateFace(faces, face, true);
//     rotateFace(faces, face, true);
//     rotateFace(faces, face, true);
//     return;
//   }

//   // 1. Rotate the face's own matrix
//   faces[face] = rotateFaceMatrix(faces[face]);

//   // 2. Rotate the adjacent edges (we handle U face first)
//   if (face === 'U') {
//     const { F, R, B, L } = faces;

//     const temp = [...F.slice(0, 3)];

//     // U rotates: F -> R -> B -> L -> F
//     F[0] = L[0]; F[1] = L[1]; F[2] = L[2];
//     L[0] = B[0]; L[1] = B[1]; L[2] = B[2];
//     B[0] = R[0]; B[1] = R[1]; B[2] = R[2];
//     R[0] = temp[0]; R[1] = temp[1]; R[2] = temp[2];
//   }

//   // TODO: Implement D, L, R, F, B face rotations
// }

// src/cube/moves.ts
import { Face, Color } from './Cube';

type Faces = Record<Face, Color[]>;

// Utility: Rotate 3x3 face clockwise
function rotateFaceMatrix(face: Color[]): Color[] {
  return [
    face[6], face[3], face[0],
    face[7], face[4], face[1],
    face[8], face[5], face[2]
  ];
}

// Core function to rotate one face and update surrounding strips
export function rotateFace(faces: Faces, face: Face, clockwise: boolean = true): void {
  if (!clockwise) {
    rotateFace(faces, face, true);
    rotateFace(faces, face, true);
    rotateFace(faces, face, true);
    return;
  }

  // Rotate the face itself
  faces[face] = rotateFaceMatrix(faces[face]);

  // Rotate the adjacent edges
  const f = faces;

  switch (face) {
    case 'U': {
      const temp = [...f.F.slice(0, 3)];
      f.F[0] = f.L[0]; f.F[1] = f.L[1]; f.F[2] = f.L[2];
      f.L[0] = f.B[0]; f.L[1] = f.B[1]; f.L[2] = f.B[2];
      f.B[0] = f.R[0]; f.B[1] = f.R[1]; f.B[2] = f.R[2];
      f.R[0] = temp[0]; f.R[1] = temp[1]; f.R[2] = temp[2];
      break;
    }

    case 'D': {
      const temp = [...f.F.slice(6, 9)];
      f.F[6] = f.R[6]; f.F[7] = f.R[7]; f.F[8] = f.R[8];
      f.R[6] = f.B[6]; f.R[7] = f.B[7]; f.R[8] = f.B[8];
      f.B[6] = f.L[6]; f.B[7] = f.L[7]; f.B[8] = f.L[8];
      f.L[6] = temp[0]; f.L[7] = temp[1]; f.L[8] = temp[2];
      break;
    }

    case 'L': {
      const temp = [f.U[0], f.U[3], f.U[6]];
      f.U[0] = f.B[8]; f.U[3] = f.B[5]; f.U[6] = f.B[2];
      f.B[8] = f.D[0]; f.B[5] = f.D[3]; f.B[2] = f.D[6];
      f.D[0] = f.F[0]; f.D[3] = f.F[3]; f.D[6] = f.F[6];
      f.F[0] = temp[0]; f.F[3] = temp[1]; f.F[6] = temp[2];
      break;
    }

    case 'R': {
      const temp = [f.U[2], f.U[5], f.U[8]];
      f.U[2] = f.F[2]; f.U[5] = f.F[5]; f.U[8] = f.F[8];
      f.F[2] = f.D[2]; f.F[5] = f.D[5]; f.F[8] = f.D[8];
      f.D[2] = f.B[6]; f.D[5] = f.B[3]; f.D[8] = f.B[0];
      f.B[6] = temp[0]; f.B[3] = temp[1]; f.B[0] = temp[2];
      break;
    }

    case 'F': {
      const temp = [f.U[6], f.U[7], f.U[8]];
      f.U[6] = f.L[8]; f.U[7] = f.L[5]; f.U[8] = f.L[2];
      f.L[8] = f.D[2]; f.L[5] = f.D[1]; f.L[2] = f.D[0];
      f.D[2] = f.R[0]; f.D[1] = f.R[3]; f.D[0] = f.R[6];
      f.R[0] = temp[0]; f.R[3] = temp[1]; f.R[6] = temp[2];
      break;
    }

    case 'B': {
      const temp = [f.U[0], f.U[1], f.U[2]];
      f.U[0] = f.R[2]; f.U[1] = f.R[5]; f.U[2] = f.R[8];
      f.R[2] = f.D[8]; f.R[5] = f.D[7]; f.R[8] = f.D[6];
      f.D[8] = f.L[6]; f.D[7] = f.L[3]; f.D[6] = f.L[0];
      f.L[6] = temp[0]; f.L[3] = temp[1]; f.L[0] = temp[2];
      break;
    }

    default:
      throw new Error(`Unknown face: ${face}`);
  }
}
