import React, { useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch, batch } from 'react-redux';

import statusSelectors from 'components/status/selectors';
import statusOps from 'components/status/operations';
import { useApplicationContext } from '~contexts/application';
import { useWorkspaceContext } from '~contexts/workspace';
import { Button } from '~styles/input/button';
import Spinner from '~styles/spinner';

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

export default function DeployButton() {
  const dispatch = useDispatch();

  const isWaiting = useSelector(statusSelectors.checkIsWaiting);

  const setIsWaiting = useCallback(() => dispatch(statusOps.setIsWaiting()), [dispatch]);
  const setNotWaiting = useCallback(() => dispatch(statusOps.setNotWaiting()), [dispatch]);
  const setMessage = useCallback((message) => dispatch(statusOps.updateMessage(message)), [dispatch]);

  const appCtx = useApplicationContext();

  const workspaceCtx = useWorkspaceContext();

  const hasChanges = appCtx.state.hasChanges || workspaceCtx.state.hasChanges;
  const isDeployed = appCtx.state.isDeployed && workspaceCtx.state.isDeployed;

  const isDisabled = isWaiting || !hasChanges;

  const onDeploy = async () => {
    // Save the current state
    appCtx.save();
    workspaceCtx.save();

    // Pack our deployment configuration
    const appPackResult = appCtx.pack();
    const workspacePackResult = workspaceCtx.pack();
    if (appPackResult.error) {
      batch(() => {
        setNotWaiting();
        setMessage(appPackResult.error);
      });
      return;
    }
    if (workspacePackResult.error) {
      batch(() => {
        setNotWaiting();
        setMessage(workspacePackResult.error);
      });
      return;
    }
    const pkg = {
      app: {
        ...appPackResult.package,
      },
      ...workspacePackResult.package,
    };
    console.log(pkg);

    // Send the configuration to be deployed
    batch(() => {
      setWaiting();
      setMessage('Deploying configuration');
    });
    try {
      const result = await axios.post('http://localhost:3030/api/v0/deploy', pkg, { withCredentials: true });
      console.log(result);
    } catch (err) {
      console.error(err);
      batch(() => {
        setNotWaiting();
        setMessage('Failed to deploy configuration: ' + err.message);
      });
    }
  };

  let buttonContent = null;
  if (isWaiting) {
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
