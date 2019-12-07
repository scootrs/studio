import React, { forwardRef } from 'react';
import styled from 'styled-components';

const BlueprintViewportContainer = styled.div`
  flex-grow: 1;
  min-height: min-content;
  display: flex;
`;

const Blueboard = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex: 1;
`;

function BoardView({ children, onClick }, ref) {
  return (
    <BlueprintViewportContainer>
      <Blueboard ref={ref} onClick={onClick}>
        {children}
      </Blueboard>
    </BlueprintViewportContainer>
  );
}

export default forwardRef(BoardView);
