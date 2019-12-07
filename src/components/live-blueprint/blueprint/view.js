import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Blueboard = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex: 1;
`;

function BoardView({ children, onClick }, ref) {
  return (
    <Blueboard ref={ref} onClick={onClick}>
      {children}
    </Blueboard>
  );
}

export default forwardRef(BoardView);
