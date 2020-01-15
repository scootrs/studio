import React, { useEffect } from 'react';
import { useApplicationContext } from '~contexts/application';
import ToolbarView, { ToolbarViewActions } from './view';
import DeployButton from './deploy-button';
import SaveButton from './save-button';
import ProviderSelect from './provider-select';
import ApplicationName from './application-name';
import RegionSelect from './region';

export default function Toolbar() {
  const ctx = useApplicationContext();
  useEffect(function() {
    ctx.load();
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
