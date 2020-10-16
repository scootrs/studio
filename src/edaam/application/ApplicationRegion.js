import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import actions from './actions';
import selectors from './selectors';
import ApplicationRegionView from './ApplicationRegionView';

export default function ProviderSelect() {
  const dispatch = useDispatch();

  const region = useSelector(selectors.getRegion);
  const setRegion = useCallback(
    (region) => {
      dispatch(actions.updateRegion(region));
    },
    [dispatch]
  );

  let caption = '';
  const result = useSelector(selectors.getIsRegionValid);
  if (!result.valid) {
    caption = result.message;
  }

  const onChange = useCallback(
    (ev) => {
      setRegion(ev.target.value);
    },
    [setRegion]
  );

  const options = [
    {
      name: 'Select a region',
      value: '',
    },
    {
      name: 'US West 2',
      value: 'us-west-2',
    },
  ];

  return (
    <ApplicationRegionView
      options={options}
      value={region}
      caption={caption}
      isValid={result.valid}
      onChange={onChange}
    />
  );
}
