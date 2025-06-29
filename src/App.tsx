// import React, { useState } from 'react';
// import './App.css';
// import { Cube, Face } from './cube/Cube';
// import CubeRenderer from './components/CubeRenderer';

// const cube = new Cube(); // Single instance across renders

// function App() {
//   const [cubeState, setCubeState] = useState(cube.getFlatColorsString());

//   const handleRotate = (face: Face) => {
//     cube.rotate(face, true); // Rotate clockwise
//     setCubeState(cube.getFlatColorsString());
//   };

//   return (
//     <div className="App">
//       <h1>Rubik's Cube Visualizer</h1>

//       <CubeRenderer cubeString={cubeState} />

//       <div style={{ marginTop: '20px' }}>
//         {(['U', 'D', 'L', 'R', 'F', 'B'] as Face[]).map(face => (
//           <button
//             key={face}
//             style={{ margin: '4px' }}
//             onClick={() => handleRotate(face)}
//           >
//             Rotate {face}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// App.tsx
// import React, { useState } from 'react';
// import './App.css';
// import { Cube, Face } from './cube/Cube';
// import CubeRenderer from './components/CubeRenderer';
// import { scrambleCube } from './cube/scramble';

// const cube = new Cube();

// function App() {
//   const [cubeState, setCubeState] = useState(cube.getFlatColorsString());
//   const [lastMoves, setLastMoves] = useState<string[]>([]);

//   const handleRotate = (face: Face) => {
//     cube.rotate(face);
//     setCubeState(cube.getFlatColorsString());
//   };

//   const handleScramble = () => {
//     const moves = scrambleCube(cube, 20);
//     setCubeState(cube.getFlatColorsString());
//     setLastMoves(moves);
//   };

//   return (
//     <div className="App">
//       <h1>Rubik's Cube Visualizer</h1>

//       <CubeRenderer cubeString={cubeState} />

//       <div style={{ marginTop: '20px' }}>
//         {(['U', 'D', 'L', 'R', 'F', 'B'] as Face[]).map(face => (
//           <button
//             key={face}
//             style={{ margin: '4px' }}
//             onClick={() => handleRotate(face)}
//           >
//             Rotate {face}
//           </button>
//         ))}
//         <button onClick={handleScramble} style={{ marginLeft: '20px' }}>
//           Scramble Cube
//         </button>
//       </div>

//       {lastMoves.length > 0 && (
//         <p>Scramble moves: {lastMoves.join(' ')}</p>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import { Cube, Face } from './cube/Cube';
import CubeRenderer from './components/CubeRenderer';
import { scrambleCube } from './cube/scramble';
import { solveCubeFromScramble } from './cube/solver';

const cube = new Cube();

function App() {
  const [cubeState, setCubeState] = useState(cube.getFlatColorsString());
  const [scrambleMoves, setScrambleMoves] = useState<string[]>([]);
  const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
  const [isSolving, setIsSolving] = useState(false);

  const handleRotate = (face: Face) => {
    if (isSolving) return; // Prevent user interaction during solving
    cube.rotate(face);
    setCubeState(cube.getFlatColorsString());
  };

  const handleScramble = () => {
    const moves = scrambleCube(cube, 20);
    setCubeState(cube.getFlatColorsString());
    setScrambleMoves(moves);
    setSolutionSteps([]);
  };

  const handleSolve = () => {
    if (scrambleMoves.length === 0 || isSolving) return;

    const clone = new Cube();
    clone.setState(cube.getState()); // Deep copy of current state
    const steps = solveCubeFromScramble(clone, scrambleMoves);
    setSolutionSteps(steps);
    setIsSolving(true);

    // Animate solving
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setIsSolving(false);
        return;
      }
      const move = steps[i];
      const face = move[0] as Face;
      const clockwise = !move.includes("'");

      cube.rotate(face, clockwise);
      setCubeState(cube.getFlatColorsString());
      i++;
    }, 300);
  };

  const handleReset = () => {
    cube.reset();
    setCubeState(cube.getFlatColorsString());
    setScrambleMoves([]);
    setSolutionSteps([]);
    setIsSolving(false);
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Rubik's Cube Solver</h1>

      <CubeRenderer cubeString={cubeState} />

      <div style={{ marginTop: '20px' }}>
        {(["U", "D", "L", "R", "F", "B"] as Face[]).map((face) => (
          <button
            key={face}
            onClick={() => handleRotate(face)}
            style={{ margin: '4px' }}
            disabled={isSolving}
          >
            Rotate {face}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleScramble} disabled={isSolving}>
          Scramble Cube
        </button>
        <button onClick={handleSolve} style={{ marginLeft: '10px' }} disabled={isSolving}>
          Solve Cube
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }} disabled={isSolving}>
          Reset Cube
        </button>
      </div>

      {scrambleMoves.length > 0 && (
        <p style={{ marginTop: '20px' }}>
          <strong>Scramble:</strong> {scrambleMoves.join(' ')}
        </p>
      )}

      {solutionSteps.length > 0 && (
        <p>
          <strong>Solution:</strong> {solutionSteps.join(' ')}
        </p>
      )}
    </div>
  );
}

export default App;


