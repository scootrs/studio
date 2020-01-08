import React from 'react';
import axios from 'axios';
import useWorkspaceContext from '~components/workspace/context';
import { useStatusContext } from '~contexts/status';
import DeployButtonView from './view';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function DeployButton() {
  const {
    actions: { setWaiting }
  } = useStatusContext();

  const {
    objects,
    actions: { pack, setPending, setMonitoring }
  } = useWorkspaceContext();

  const onDeploy = async () => {
    setWaiting(true, 'Deploying configuration');
    await sleep(3000);
    setWaiting(true, 'Finishing up');
    await sleep(3000);
    setWaiting(false);
    //let response = await axios.post('http://localhost:3030/api/v0/deploy', pack(), { timeout: 10000 });
    // let objs = Object.values(objects)
    //   .filter(
    //     o => o.type === 'event' && response.data.content.events.http[o.config.path].methods.includes(o.config.method)
    //   )
    //   .map(o => ({ id: o.id, url: response.data.content.events.http[o.config.path].url }));
    // setMonitoring(objs);
  };

  return <DeployButtonView onDeploy={onDeploy} />;
}
