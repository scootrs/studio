import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Blueboard = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex: 1;
`;

function BoardView({ children }, ref) {
  return <Blueboard ref={ref}>{children}</Blueboard>;
}

export default forwardRef(BoardView);
