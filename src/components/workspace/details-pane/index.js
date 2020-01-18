import React from 'react';
import { useWorkspaceContext } from '~contexts/workspace';
import DetailsPaneView from './view';
import Details from './details';
import useComputeDetails from './details/compute';
import useStorageDetails from './details/storage';
import useExternalEventDetails from './details/event-external';
import useInternalEventDetails from './details/event-internal';
import useReferenceDetails from './details/reference';
import WelcomePane from './welcome';
import { Compute, Storage, EventExternal, EventInternal, Reference } from '~types';

function Current({ type }) {
  if (type) {
    switch (type) {
      case Compute:
        return <Details details={useComputeDetails()} />;

      case Storage:
        return <Details details={useStorageDetails()} />;

      case EventExternal:
        return <Details details={useExternalEventDetails()} />;

      case EventInternal:
        return <Details details={useInternalEventDetails()} />;

      case Reference:
        return <Details details={useReferenceDetails()} />;

      default:
        return <p>Unable to display details for selected type</p>;
    }
  } else {
    return <WelcomePane />;
  }
}

export default function DetailsPane() {
  const {
    state: { selected }
  } = useWorkspaceContext();

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
      <Current type={selected && selected.meta.type} />
    </DetailsPaneView>
  );
}
