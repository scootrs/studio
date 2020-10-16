import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import actions from './actions';
import selectors from './selectors';
import ApplicationProviderView from './ApplicationProviderView';

function ApplicationProvider() {
  const dispatch = useDispatch();

  const provider = useSelector(selectors.getProvider);
  const setProvider = useCallback(
    (provider) => {
      dispatch(actions.updateProvider(provider));
    },
    [dispatch]
  );

  let caption = '';
  const result = useSelector(selectors.getIsProviderValid);
  if (!result.valid) {
    caption = result.message;
  }

  const onChange = useCallback(
    (provider) => {
      setProvider(provider);
    },
    [setProvider]
  );

  const options = [
    {
      name: 'Select a provider',
      value: '',
    },
    {
      name: 'AWS',
      value: 'aws',
    },
  ];

  return (
    <ApplicationProviderView
      options={options}
      value={provider}
      caption={caption}
      isValid={result.valid}
      onChange={onChange}
    />
  );
}

export default ApplicationProvider;
