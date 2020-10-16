import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import actions from './actions';
import selectors from './selectors';
import ApplicationNameView from './ApplicationNameView';

function ApplicationName() {
  const dispatch = useDispatch();

  const name = useSelector(selectors.getName);
  const setName = useCallback(
    (name) => {
      dispatch(actions.updateName(name));
    },
    [dispatch]
  );

  let caption = '';
  const result = useSelector(selectors.getIsNameValid);
  if (!result.valid) {
    caption = error.message;
  }

  const onChangeEnd = useCallback(
    (val) => {
      setName(val);
    },
    [setName]
  );

  return <ApplicationNameView value={name} caption={caption} isValid={result.valid} onChangeEnd={onChangeEnd} />;
}

export default ApplicationName;
