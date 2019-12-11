import React from 'react';
import View from './view';
import { WorkspaceContextProvider } from './context';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';

export default function Workspace() {
  const onDrag = () => {
    document.dispatchEvent(new Event('split-resize'));
  };

  return (
    <WorkspaceContextProvider>
      <View onDrag={onDrag}>
        <Blueprint />
        <DetailsPane />
      </View>
    </WorkspaceContextProvider>
  );
}
