import events from './events';

import action from 'shared/action';

export default {
  updateName: (id, name) => action(events.UPDATE_NAME, { id, name }),
  updateProvider: (id, provider) => action(events.UPDATE_PROVIDER, { id, provider }),
  updateRegion: (id, region) => action(events.UPDATE_REGION, { id, region }),
  queueDeployment: (id, pkg) => action(events.QUEUE_DEPLOYMENT, { id, pkg }),
  queueDeploymentResponse: (id, result, error) => action(events.QUEUE_DEPLOYMENT_RESULT, { id, result }, error),
  deploymentProgress: (id, message) => action(events.DEPLOYMENT_PROGRESS, { id, message }),
  deploymentResult: (id, message, error) => action(events.DEPLOYMENT_RESULT, { id, message }, error),
  save: (id, contents) => action(events.SAVE, { id, contents }),
  load: (id) => action(events.LOAD, id),
  select: (id) => action(events.SELECT, id),
};
