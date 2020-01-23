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
  flex-grow: 1;
  background-size: 10px 10px;
  background-image: linear-gradient(
      to right,
      ${({ theme }) => (theme.mode === 'light' ? theme.colors.backgrounds.light : theme.colors.backgrounds.medium)} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => (theme.mode === 'light' ? theme.colors.backgrounds.light : theme.colors.backgrounds.medium)} 1px,
      transparent 1px
    );
`;

function BlueprintCanvasView({ children, onClick, UtilityBar, onContextMenu }, ref) {
  return (
    <CanvasRoot onContextMenu={onContextMenu}>
      <UtilityBar />
      <Canvas ref={ref} onClick={onClick}>
        {children}
      </Canvas>
    </CanvasRoot>
  );
}

export default forwardRef(BlueprintCanvasView);
