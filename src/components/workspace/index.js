import React from 'react';
import View from './view';
import { WorkspaceContextProvider } from '~contexts/workspace';
import { ApplicationContextProvider } from '~contexts/application';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';
import { ServerSentEventListener } from './subscriber';

export default function Workspace() {
  const onDrag = () => {
    document.dispatchEvent(new Event('split-resize'));
  };

  const sseUrl = 'http://localhost:3030/subscribe';

  return (
    <ApplicationContextProvider>
      <WorkspaceContextProvider>
        <View onDrag={onDrag}>
          <Blueprint />
          <DetailsPane />
        </View>
      </WorkspaceContextProvider>
    </ApplicationContextProvider>
  );
}
