import React from 'react';
import ToolbarView from './view';
import DeployButton from './deploy-button';
import ProviderSelect from './provider-select';

export default function Toolbar() {
  return (
    <ToolbarView>
      <ProviderSelect />
      <DeployButton />
    </ToolbarView>
  );
}
