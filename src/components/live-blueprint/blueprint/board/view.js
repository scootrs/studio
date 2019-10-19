import React, { forwardRef } from 'react';
import styled from 'styled-components';
import BlueprintItem from './blueprint-item';

const Blueboard = styled.div`
  width: 1000px;
  height: 1000px;
  z-index: -1;
`;

function BoardView({ functions }, ref) {
  return (
    <Blueboard ref={ref}>
      {functions ? Object.values(functions).map(f => <BlueprintItem key={f.id} x={f.x} y={f.y} />) : ''}
    </Blueboard>
  );
}

export default forwardRef(BoardView);
