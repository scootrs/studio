import React, { useContext } from 'react';
import DetailsPaneView from './view';
import BlueprintContext from '../context';
import ComputeDetails from './compute-details';
import StorageDetails from './storage-details';
import EventDetails from './event-details';

function DetailsPane() {
  const { state } = useContext(BlueprintContext);

  function Current() {
    switch (state.current.type) {
      case 'compute':
        return <ComputeDetails object={state.objects[state.current.id]} />;

      case 'storage':
        return <StorageDetails object={state.objects[state.current.id]} />;

      case 'event':
        return <EventDetails object={state.objects[state.current.id]} />;

      default:
        return <p>Select an item from the blueprint to view details</p>
    }
  }

  return (
    <DetailsPaneView>
      <Current />
    </DetailsPaneView>
  );
}

export default DetailsPane;
