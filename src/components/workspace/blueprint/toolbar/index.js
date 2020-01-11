import React from 'react';
import ToolbarView, { ToolbarViewActions } from './view';
import DeployButton from './deploy-button';
import ProviderSelect from './provider-select';
import ApplicationName from './application-name';
import RegionSelect from './region';

export default function Toolbar() {
  return (
    <ToolbarView>
      <ApplicationName />
      <ToolbarViewActions>
        <ProviderSelect />
        <RegionSelect />
        <DeployButton />
      </ToolbarViewActions>
    </ToolbarView>
  );
}
