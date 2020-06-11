import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button } from 'styles/input/button';
import Spinner from 'styles/spinner';

const StyledDeployButton = styled(Button)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.static.dark.fonts.main};
  border-color: ${({ theme }) => theme.colors.primary.main}
  background-color: ${({ theme }) => theme.colors.primary.main};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  padding: 3px 8px;
  white-space: pre;

  &:hover {
    ${({ theme, disabled }) => {
      let s = '';
      if (!disabled) {
        s += `
          background-color: ${theme.colors.primary.light};
          border-color: ${theme.colors.primary.light};
        `;
      } else {
        s += `
          background-color: ${theme.colors.primary.main};
          border-color: ${theme.colors.primary.main};
        `;
      }

      if (disabled) {
        s += `
          cursor: default;
        `;
      } else {
        s += `
          cursor: pointer;
        `;
      }
      return s;
    }}
`;

function ApplicationDeployButtonView({ isDeploying, isDeployed, hasChanges, onDeploy }) {
  const isDisabled = isDeploying || !hasChanges;
  let buttonContent = null;
  if (isDeploying) {
    buttonContent = <Spinner />;
  } else if (isDeployed && hasChanges) {
    buttonContent = 'Deploy Changes';
  } else {
    buttonContent = 'Deploy';
  }

  return (
    <StyledDeployButton disabled={isDisabled} onClick={onDeploy}>
      {buttonContent}
    </StyledDeployButton>
  );
}

export default ApplicationDeployButtonView;
