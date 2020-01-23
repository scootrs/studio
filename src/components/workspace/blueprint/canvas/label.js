import React from 'react';
import styled from 'styled-components';
import ExclamationTriangleSolidSvg from './blueprint-resource/vectors/exclamation-triangle-solid.svg';

const InvalidAlert = styled(ExclamationTriangleSolidSvg)`
  path {
    fill: ${({ theme }) => theme.colors.secondary.medium};
    stroke: white;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  user-select: none;
  z-index: 100;
`;

function Label({ content, isValid, isSelected, theme }) {
  return (
    <LabelContainer theme={theme} isSelected={isSelected}>
      {content} {isValid ? '' : <InvalidAlert theme={theme} width={20} height={20} />}
    </LabelContainer>
  );
}

export default Label;
