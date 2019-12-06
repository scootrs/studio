import React from 'react';
import styled from 'styled-components';
import Board from './board';

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

function BlueprintView() {
  return (
    <Viewport>
      <Board />
    </Viewport>
  );
}

export default BlueprintView;
