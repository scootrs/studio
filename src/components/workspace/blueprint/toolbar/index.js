import React from 'react';
import ToolbarView from './view';
import DeployButton from './deploy-button';

export default function Toolbar() {
  return (
    <ToolbarView>
      <DeployButton />
    </ToolbarView>
  );
}
