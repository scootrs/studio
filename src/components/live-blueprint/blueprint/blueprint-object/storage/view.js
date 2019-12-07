import React from 'react';
import styled from 'styled-components';

const View = styled.div`
  border: ${({ selected, theme }) => (selected ? `2px solid ${theme.colors.secondary.main}` : 'none')};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

function StorageBlueprintObjectView({ id, selected, x, y, children }) {
  return (
    <View id={id} selected={selected} x={x} y={y}>
      {children}
    </View>
  );
}

export default StorageBlueprintObjectView;
