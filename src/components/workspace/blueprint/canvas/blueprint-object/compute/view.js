import React, { forwardRef } from 'react';
import styled from 'styled-components';

const View = styled.div`
  border: ${({ selected, theme }) => `5px solid ${selected ? theme.colors.secondary.main : 'transparent'}`};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  display: flex;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    cursor: move;
  }
`;

function ComputeBlueprintObjectView({ id, selected, x, y, onClick, children, onKeyPress }, ref) {
  return (
    <View ref={ref} id={id} tabIndex={-1} selected={selected} x={x} y={y} onClick={onClick} onKeyPress={onKeyPress}>
      {children}
    </View>
  );
}

export default forwardRef(ComputeBlueprintObjectView);
