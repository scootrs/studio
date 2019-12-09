import React from 'react';
import View from './view';
import { WorkspaceContextProvider } from './context';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';

export default function Workspace() {
  return (
    <WorkspaceContextProvider>
      <View>
        <Blueprint />
        <DetailsPane />
      </View>
    </WorkspaceContextProvider>
  );
}
