import React from 'react';
import axios from 'axios';
import { useApplicationContext } from '~contexts/application';
import { useWorkspaceContext } from '~contexts/workspace';
import { useStatusContext } from '~contexts/status';
import DeployButtonView from './view';

export default function DeployButton() {
  const {
    actions: { setWaiting }
  } = useStatusContext();

  const appCtx = useApplicationContext();

  const workspaceCtx = useWorkspaceContext();

  const onDeploy = async () => {
    const pkg = {
      ...appCtx.pack(),
      ...workspaceCtx.pack()
    };
    console.log(pkg);
    setWaiting(true, 'Deploying configuration');
    const result = await axios.post('http://localhost:3030/api/v0/deploy', pkg, { withCredentials: true });
    console.log(result);
  };

  return <DeployButtonView onDeploy={onDeploy} />;
}
