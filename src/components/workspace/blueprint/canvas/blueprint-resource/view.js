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

const InnerContaier = styled.div`
  position: relative;
`;

const TitleSpan = styled.span`
  position: absolute;
  left: calc(50%);
  transform: translateX(-50%);
  top: -17px;
  font-size: 0.7em;
`;

function BlueprintResourceView({ id, name, selected, x, y, onClick, children, onKeyPress }, ref) {
  return (
    <View ref={ref} id={id} tabIndex={-1} selected={selected} x={x} y={y} onClick={onClick} onKeyPress={onKeyPress}>
      <InnerContaier>
        <TitleSpan>{name}</TitleSpan>
        {children}
      </InnerContaier>
    </View>
  );
}

export default forwardRef(BlueprintResourceView);
