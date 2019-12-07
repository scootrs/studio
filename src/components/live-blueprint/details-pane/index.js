import React from 'react';
import useBlueprintContext from '~components/live-blueprint/context';
import useDetailsPaneContext from './context';
import DetailsPaneView from './view';
import ComputeDetails from './compute-details';
import StorageDetails from './storage-details';
import EventDetails from './event-details';

function Current() {
  const { selected, config } = useBlueprintContext();
  if (selected) {
    let object = config[selected];

    switch (object.type) {
      case 'compute':
        return <ComputeDetails object={object} />;

      case 'storage':
        return <StorageDetails object={object} />;

      case 'event':
        return <EventDetails object={object} />;

      default:
        return <p>Unable to display details for selected type</p>;
    }
  } else {
    return <p>Select an item from the blueprint to view details</p>;
  }
}

export default function DetailsPane() {
  const {
    config,
    selected,
    actions: { setObjectConfig }
  } = useBlueprintContext();
  const {
    objectId,
    saved,
    actions: { saveWith, init }
  } = useDetailsPaneContext();

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.focus();
  };

  const onKeyDown = ev => {
    if (ev.ctrlKey && String.fromCharCode(ev.which).toLowerCase() === 's') {
      ev.stopPropagation();
      ev.preventDefault();
      saveWith(setObjectConfig);
    }
  };

  if (selected !== objectId) {
    if (!saved) {
      saveWith(setObjectConfig);
    }
    init(selected, config[selected]);
  }

  return (
    <DetailsPaneView onClick={onClick} onKeyDown={onKeyDown}>
      <Current />
    </DetailsPaneView>
  );
}
