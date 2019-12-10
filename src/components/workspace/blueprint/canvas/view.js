import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CanvasRoot = styled.div`
  flex-grow: 1;
  min-height: min-content;
  display: flex;
`;

const Canvas = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex: 1;
`;

function BlueprintCanvasView({ children, onDoubleClick }, ref) {
  return (
    <CanvasRoot>
      <Canvas ref={ref} onDoubleClick={onDoubleClick}>
        {children}
      </Canvas>
    </CanvasRoot>
  );
}

export default forwardRef(BlueprintCanvasView);
