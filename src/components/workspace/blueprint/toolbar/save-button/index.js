import React from 'react';
import { useApplicationContext } from '~contexts/application';
import { useWorkspaceContext } from '~contexts/workspace';
import SaveButtonView from './view';

export default function SaveButton() {
  const appCtx = useApplicationContext();
  const workspaceCtx = useWorkspaceContext();

  const onSave = function() {
    appCtx.save();
    workspaceCtx.save();
  };

  return <SaveButtonView onSave={onSave} />;
}
