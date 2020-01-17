import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useApplicationContext } from '~contexts/application';
import { useWorkspaceContext } from '~contexts/workspace';
import { useStatusContext } from '~contexts/status';
import { Button } from '~styles/input/button';
import Spinner from '~styles/spinner';

const StyledDeployButton = styled(Button)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fonts.light};
  border-color: ${({ theme }) => theme.colors.primary.main}
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 3px 8px;
  width: 80px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    border-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

export default function DeployButton() {
  const {
    state: { isWaiting },
    actions: { setWaiting }
  } = useStatusContext();

  const appCtx = useApplicationContext();

  const workspaceCtx = useWorkspaceContext();

  const onDeploy = async () => {
    const appPackResult = appCtx.pack();
    const workspacePackResult = workspaceCtx.pack();
    if (appPackResult.error) {
      return setWaiting(false, appPackResult.error);
    }
    if (workspacePackResult.error) {
      return setWaiting(false, workspacePackResult.error);
    }
    const pkg = {
      app: {
        ...appPackResult.package
      },
      ...workspacePackResult.package
    };
    console.log(pkg);
    setWaiting(true, 'Deploying configuration');
    try {
      const result = await axios.post('http://localhost:3030/api/v0/deploy', pkg, { withCredentials: true });
      console.log(result);
    } catch (err) {
      console.error(err);
      setWaiting(false, 'Failed to deploy configuration: ' + err.message);
    }
  };

  return (
    <StyledDeployButton disabled={isWaiting} onClick={onDeploy}>
      {isWaiting ? <Spinner /> : 'Deploy'}
    </StyledDeployButton>
  );
}
