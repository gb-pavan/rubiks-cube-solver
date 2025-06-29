import React, { useState } from 'react';
import './App.css';
import { Cube, Face } from './cube/Cube';
import CubeRenderer from './components/CubeRenderer';

const cube = new Cube(); // Single instance across renders

function App() {
  const [cubeState, setCubeState] = useState(cube.getFlatColorsString());

  const handleRotate = (face: Face) => {
    cube.rotate(face, true); // Rotate clockwise
    setCubeState(cube.getFlatColorsString());
  };

  return (
    <div className="App">
      <h1>Rubik's Cube Visualizer</h1>

      <CubeRenderer cubeString={cubeState} />

      <div style={{ marginTop: '20px' }}>
        {(['U', 'D', 'L', 'R', 'F', 'B'] as Face[]).map(face => (
          <button
            key={face}
            style={{ margin: '4px' }}
            onClick={() => handleRotate(face)}
          >
            Rotate {face}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
