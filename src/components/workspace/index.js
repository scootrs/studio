import React, { useEffect } from 'react';
import { useWorkspaceContext } from '~contexts/workspace';
import View from './view';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';

export default function Workspace() {
  const onDrag = () => {
    document.dispatchEvent(new Event('monaco:resize'));
  };

  const ctx = useWorkspaceContext();
  useEffect(function() {
    ctx.load();
  }, []);

  return (
    <View onDrag={onDrag}>
      <Blueprint />
      <DetailsPane />
    </View>
  );
}
