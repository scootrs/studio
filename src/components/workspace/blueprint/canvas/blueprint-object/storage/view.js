import React from 'react';
import styled from 'styled-components';

const View = styled.div`
  border: ${({ selected, theme }) => `5px solid ${selected ? theme.colors.secondary.main : 'transparent'}`};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  display: flex;
  cursor: pointer;

  &:active {
    cursor: move;
  }
`;

function StorageBlueprintObjectView({ id, selected, x, y, onClick, children }) {
  return (
    <View id={id} selected={selected} x={x} y={y} onClick={onClick}>
      {children}
    </View>
  );
}

export default StorageBlueprintObjectView;
