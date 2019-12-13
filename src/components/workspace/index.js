import React from 'react';
import View from './view';
import { WorkspaceContextProvider } from './context';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';
import useServerSideEvents from './subscriber';

const ServerSideEventListener = ({ children }) => {
  useServerSideEvents('http://localhost:3030/subscribe');

  return children;
};

export default function Workspace() {
  const onDrag = () => {
    document.dispatchEvent(new Event('split-resize'));
  };

  return (
    <WorkspaceContextProvider>
      <ServerSideEventListener>
        <View onDrag={onDrag}>
          <Blueprint />
          <DetailsPane />
        </View>
      </ServerSideEventListener>
    </WorkspaceContextProvider>
  );
}
