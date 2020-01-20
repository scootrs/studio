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
`;

function Label({ content, isValid, theme }) {
  return (
    <LabelContainer theme={theme}>
      {content} {isValid ? '' : <InvalidAlert theme={theme} width={20} height={20} />}
    </LabelContainer>
  );
}

export default Label;
