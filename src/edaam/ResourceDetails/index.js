import React from 'react';
import { useSelector } from 'react-redux';

import ResourceDetails from 'shared/components/ResourceDetails';
import useHandlerDetails from 'edaam/handler/details';
import useStorageDetails from 'edaam/storage/details';
import useExternalEventDetails from 'edaam/event/external-event-details';
import useInternalEventDetails from 'edaam/event/internal-event-details';
import useReferenceDetails from 'edaam/reference/details';
import selectors from 'edaam/selected/selectors';

import ResourceDetailsView from './view';
import WelcomePane from './welcome';

function HandlerDetails({ resource }) {
  return <ResourceDetails details={useHandlerDetails(resource)} />;
}

function StorageDetails({ resource }) {
  return <ResourceDetails details={useStorageDetails(resource)} />;
}

function ExternalEventDetails({ resource }) {
  return <ResourceDetails details={useExternalEventDetails(resource)} />;
}

function InternalEventDetails({resource}) {
  return <ResourceDetails details={useInternalEventDetails(resource)} />;
}

function ReferenceConnectionDetails({resource}) {
  return <ResourceDetails details={useReferenceDetails(resource)} />;
}

function EmptyDetails() {
  return <p>Unable to display details for selected resource</p>;
}

function Current({ resource }) {
  if (resource) {
    switch (resource._meta.type) {
      case 'handler':
        return <HandlerDetails resource={resource} />

      case 'storage':
        return <StorageDetails resource={resource}/>;

      case 'external-event':
        return <ExternalEventDetails resource={resource} />;

      case 'internal-event':
        return <InternalEventDetails resource={resource} />;

      case 'reference':
        return <ReferenceConnectionDetails resource={resource} />;

      default:
        return <EmptyDetails />
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
