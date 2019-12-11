import React from 'react';
import ToolbarView, { ToolbarViewActions } from './view';
import DeployButton from './deploy-button';
import ProviderSelect from './provider-select';
import ApplicationName from './application-name';
import ProgressBar from './progress-bar';

export default function Toolbar() {
  return (
    <ToolbarView Loader={ProgressBar}>
      <ApplicationName />
      <ToolbarViewActions>
        <ProviderSelect />
        <DeployButton />
      </ToolbarViewActions>
    </ToolbarView>
  );
}
