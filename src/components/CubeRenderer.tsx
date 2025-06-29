// src/components/CubeRenderer.tsx

import React from 'react';
import { getCubeSvg } from '../utils/getCubeSvg';

interface CubeRendererProps {
  cubeString: string;
}

const CubeRenderer: React.FC<CubeRendererProps> = ({ cubeString }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: getCubeSvg(cubeString) }}
    />
  );
};

export default CubeRenderer;
