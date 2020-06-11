import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import actions from 'application/actions';
import DeployButton from 'application/ApplicationDeployButton';
import SaveButton from 'application/ApplicationSaveButton';
import ProviderSelect from 'application/ApplicationProvider';
import ApplicationName from 'application/ApplicationName';
import RegionSelect from 'application/ApplicationRegion';

import ToolbarView, { ToolbarViewActions } from './view';

export default function Toolbar() {
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(actions.load('edaam:application/default'))
  }, []);

  return (
    <ToolbarView>
      <ApplicationName />
      <ToolbarViewActions>
        <ProviderSelect />
        <RegionSelect />
        <SaveButton />
        <DeployButton />
      </ToolbarViewActions>
    </ToolbarView>
  );
}
