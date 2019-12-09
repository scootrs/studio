import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import DeployButtonView from './view';

export default function DeployButton() {
  const {
    actions: { pack }
  } = useWorkspaceContext();

  const onDeploy = () => console.log('Deploying', pack());

  return <DeployButtonView onDeploy={onDeploy} />;
}
