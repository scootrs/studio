import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import selectors from './selectors';
import actions from './actions';
import ApplicationDeployButtonView from './ApplicationDeployButtonView';

function ApplicationDeployButton() {
  const dispatch = useDispatch();

  const id = useSelector(selectors.getId);
  const isDeploying = useSelector(selectors.getIsDeploying);
  const isDeployed = useSelector(selectors.getIsDeployed);
  const hasChanges = useSelector(selectors.getHasUnsavedChanges);

  const onDeploy = useCallback(() => {
    dispatch(actions.queueDeployment(id));
  }, [dispatch, id]);

  return (
    <ApplicationDeployButtonView
      hasChanges={hasChanges}
      isDeployed={isDeployed}
      isDeploying={isDeploying}
      onDeploy={onDeploy}
    />
  );
}

export default ApplicationDeployButton;
