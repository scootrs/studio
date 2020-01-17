import React from 'react';
import { useApplicationContext } from '~contexts/application';
import { useWorkspaceContext } from '~contexts/workspace';
import { Button } from '~styles/input/button';

export default function SaveButton() {
  const appCtx = useApplicationContext();
  const workspaceCtx = useWorkspaceContext();

  const onSave = function() {
    appCtx.save();
    workspaceCtx.save();
  };

  return <Button onClick={onSave}>Save</Button>;
}
