import React from 'react';
import useBlueprintContext from '../context';
import DetailsPaneView from './view';
import ComputeDetails from './compute-details';
import StorageDetails from './storage-details';
import EventDetails from './event-details';

function Current({ type }) {
  if (type) {
    switch (type) {
      case 'compute':
        return <ComputeDetails />;

      case 'storage':
        return <StorageDetails />;

      case 'event':
        return <EventDetails />;

      default:
        return <p>Unable to display details for selected type</p>;
    }
  } else {
    return <p>Select an item from the blueprint to view details</p>;
  }
}

export default function DetailsPane() {
  const { objects, selected } = useBlueprintContext();

  const type = selected ? objects[selected].type : null;

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.focus();
  };

  const onKeyDown = ev => {
    if (ev.ctrlKey && String.fromCharCode(ev.which).toLowerCase() === 's') {
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  return (
    <DetailsPaneView onClick={onClick} onKeyDown={onKeyDown}>
      <Current type={type} />
    </DetailsPaneView>
  );
}
