import React from 'react';
import styled from 'styled-components';

import ExclamationTriangleSolidSvg from 'shared/vectors/exclamation-triangle-solid.svg';

const InvalidAlert = styled(ExclamationTriangleSolidSvg)`
  pointer-events: none;
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
  padding: 5px;
`;

function ResourceLabel({ content, isValid, isSelected, theme, onClick }) {
  return (
    <LabelContainer theme={theme} isSelected={isSelected} onClick={onClick}>
      {content} {isValid ? '' : <InvalidAlert theme={theme} width={20} height={20} />}
    </LabelContainer>
  );
}

export default ResourceLabel;
