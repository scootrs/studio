import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import actions from 'edaam/application/actions';
import DeployButton from 'edaam/application/ApplicationDeployButton';
import SaveButton from 'edaam/application/ApplicationSaveButton';
import ProviderSelect from 'edaam/application/ApplicationProvider';
import ApplicationName from 'edaam/application/ApplicationName';
import RegionSelect from 'edaam/application/ApplicationRegion';

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
