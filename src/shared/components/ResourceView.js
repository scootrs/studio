import React, { forwardRef } from 'react';
import styled from 'styled-components';

import ExclamationTriangleSolidSvg from 'shared/vectors/exclamation-triangle-solid.svg';

const View = styled.div`
  border: ${({ isSelected, theme }) => `5px solid ${isSelected ? theme.colors.secondary.main : 'transparent'}`};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  display: flex;
  cursor: pointer;
  user-select: none;
  border-radius: 3px;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')}

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

function ResourceView(
  { children, metaId, name, isSelected, x, y, isValid, onClick, onKeyPress, onContextMenu },
  ref
) {
  return (
    <View
      ref={ref}
      id={metaId}
      x={x}
      y={y}
      isSelected={isSelected}
      onClick={onClick}
      onKeyPress={onKeyPress}
      onContextMenu={onContextMenu}
      tabIndex={-1}
    >
      <InnerContaier>
        <TitleSpan>{name}</TitleSpan>
        {isValid ? '' : <IconSpan>{!isValid ? <InvalidAlert width={20} height={20} /> : ''}</IconSpan>}
        {children}
      </InnerContaier>
    </View>
  );
}

export default forwardRef(ResourceView);
