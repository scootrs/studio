import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from './actions';
import selectors from './selectors';
import ApplicationSaveButtonView from './ApplicationSaveButtonView';

function ApplicationSaveButton() {
  const dispatch = useDispatch();

  const app = useSelector(selectors.getAll);

  const onSave = useCallback(() => {
    dispatch(actions.save(app));
  }, [dispatch, app]);

  return <ApplicationSaveButtonView onClick={onSave}>Save</ApplicationSaveButtonView>;
}

export default ApplicationSaveButton;
