import React from 'react';
import { useSelector } from 'react-redux';

import ResourceDetails from 'shared/components/ResourceDetails';
import useComputeDetails from 'edaam/handler/details';
import useStorageDetails from 'edaam/storage/details';
import useExternalEventDetails from 'edaam/event/external-event-details';
import useInternalEventDetails from 'edaam/event/internal-event-details';
import useReferenceDetails from 'edaam/reference/details';
import selectors from 'edaam/selected/selectors';

import ResourceDetailsView from './view';
import WelcomePane from './welcome';

function Current({ resource }) {
  if (resource) {
    switch (resource._meta.type) {
      case 'handler':
        return <ResourceDetails details={useComputeDetails(resource)} />;

      case 'storage':
        return <ResourceDetails details={useStorageDetails(resource)} />;

      case 'external-event':
        return <ResourceDetails details={useExternalEventDetails(resource)} />;

      case 'internal-event':
        return <ResourceDetails details={useInternalEventDetails(resource)} />;

      case 'reference':
        return <ResourceDetails details={useReferenceDetails(resource)} />;

      default:
        return <p>Unable to display details for selected resource</p>;
    }
  } else {
    return <WelcomePane />;
  }
}

export default function DetailsPane() {
  const resource = useSelector(selectors.getSelectedResource);

  const onClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.focus();
  };

  const onKeyDown = (ev) => {
    if (ev.ctrlKey && String.fromCharCode(ev.which).toLowerCase() === 's') {
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  return (
    <ResourceDetailsView onClick={onClick} onKeyDown={onKeyDown}>
      <Current resource={resource} />
    </ResourceDetailsView>
  );
}
