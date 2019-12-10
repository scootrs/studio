import React from 'react';
import ToolbarView from './view';
import DeployButton from './deploy-button';
import ProviderSelect from './provider-select';
import ApplicationName from './application-name';

export default function Toolbar() {
  return (
    <ToolbarView
      actions={
        <>
          <ProviderSelect />
          <DeployButton />
        </>
      }
    >
      <ApplicationName />
    </ToolbarView>
  );
}
