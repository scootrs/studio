import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from './actions';
import selectors from './selectors';
import { useWorkspaceContext } from '~contexts/workspace';
import ApplicationSaveButtonView from './ApplicationSaveButtonView';

function ApplicationSaveButton() {
  const dispatch = useDispatch();

  const app = useSelector(selectors.getAll);
  const workspaceCtx = useWorkspaceContext();

  const onSave = useCallback(() => {
    dispatch(actions.save(app));
    workspaceCtx.save();
  }, [dispatch, workspaceCtx]);

  return <ApplicationSaveButtonView onClick={onSave}>Save</ApplicationSaveButtonView>;
}

export default ApplicationSaveButton;
