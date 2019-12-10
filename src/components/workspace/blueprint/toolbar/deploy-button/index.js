import React from 'react';
import axios from 'axios';
import useWorkspaceContext from '~components/workspace/context';
import DeployButtonView from './view';

export default function DeployButton() {
  const {
    actions: { pack }
  } = useWorkspaceContext();

  const onDeploy = async () => {
    let response = await axios.post('http://localhost:3030/api/v0/deploy', pack());
    console.log(response);
  };

  return <DeployButtonView onDeploy={onDeploy} />;
}
