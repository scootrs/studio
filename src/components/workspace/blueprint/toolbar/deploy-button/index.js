import React from 'react';
import axios from 'axios';
import useWorkspaceContext from '~components/workspace/context';
import DeployButtonView from './view';

export default function DeployButton() {
  const {
    objects,
    actions: { pack, setPending, setMonitoring }
  } = useWorkspaceContext();

  console.log('In DeployButton', objects);

  const onDeploy = async () => {
    setPending(true);
    let response = await axios.post('http://localhost:3030/api/v0/deploy', pack(), { timeout: 10000 });
    setPending(false);
    console.log(response.data);
    let objs = Object.values(objects)
      .filter(
        o => o.type === 'event' && response.data.content.events.http[o.config.path].methods.includes(o.config.method)
      )
      .map(o => ({ id: o.id, url: response.data.content.events.http[o.config.path].url }));
    setMonitoring(objs);
  };

  return <DeployButtonView onDeploy={onDeploy} />;
}
