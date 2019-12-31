import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import DetailsPaneView from './view';
import Details from './details';
import useComputeDetails from './details/compute';
import useStorageDetails from './details/storage';
import useExternalEventDetails from './details/event-external';
import useInternalEventDetails from './details/event-internal';
import useConnectionDetails from './details/connection';
import MustSelectPane from './none-selected';

function Current({ type }) {
  if (type) {
    switch (type) {
      case 'compute':
        return <Details details={useComputeDetails()} />;

      case 'storage':
        return <Details details={useStorageDetails()} />;

      case 'event-external':
        return <Details details={useExternalEventDetails()} />;

      case 'event-internal':
        return <Details details={useInternalEventDetails()} />;

      case 'connection':
        return <Details details={useConnectionDetails()} />;

      default:
        return <p>Unable to display details for selected type</p>;
    }
  } else {
    return <MustSelectPane />;
  }
}

export default function DetailsPane() {
  const { selected } = useWorkspaceContext();

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
      <Current type={selected && selected.type} />
    </DetailsPaneView>
  );
}
