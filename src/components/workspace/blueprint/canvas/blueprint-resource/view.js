import React, { forwardRef } from 'react';
import styled from 'styled-components';
import ExclamationTriangleSolidSvg from './vectors/exclamation-triangle-solid.svg';

const View = styled.div`
  border: ${({ selected, theme }) => `5px solid ${selected ? theme.colors.secondary.main : 'transparent'}`};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  display: flex;
  cursor: pointer;
  user-select: none;

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

const IconSpan = styled.span`
  position: absolute;
  top: 80%;
  left: 60%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const InvalidAlert = styled(ExclamationTriangleSolidSvg)`
  path {
    fill: ${({ theme }) => theme.colors.secondary.medium};
    stroke: white;
  }
`;

function BlueprintResourceView({ id, name, selected, x, y, onClick, children, onKeyPress, isValid }, ref) {
  return (
    <View
      ref={ref}
      id={id}
      tabIndex={-1}
      selected={selected}
      x={x}
      y={y}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      <InnerContaier>
        <TitleSpan>{name}</TitleSpan>
        {isValid ? '' : <IconSpan>{!isValid ? <InvalidAlert width={20} height={20} /> : ''}</IconSpan>}
        {children}
      </InnerContaier>
    </View>
  );
}

export default forwardRef(BlueprintResourceView);
