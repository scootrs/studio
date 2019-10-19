import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  position: absolute;
  top: ${({ y }) => y + 'px'}
  left: ${({ x }) => x + 'px'}
`;

function BlueprintItem({ x, y }) {
  return <Item x={x} y={y} />;
}

export default BlueprintItem;
