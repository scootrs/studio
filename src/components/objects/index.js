import React from 'react';

import ComputeObject, { DraggableComputeObject } from './compute';
import StorageObject, { DraggableStorageObject } from './storage';
import EventObject, { DraggableEventObject } from './event';

export default function Object({ type, ...rest }) {
  let whc = { width: 40, height: 40, className: '' };
  switch (type) {
    case 'compute':
      return <ComputeObject {...rest} {...whc} />;

    case 'storage':
      return <StorageObject {...rest} {...whc} />;

    case 'event':
      return <EventObject {...rest} {...whc} />;
  }
}

export function DraggableObject({ type, ...rest }) {
  let whc = { width: 40, height: 40, className: '' };
  switch (type) {
    case 'compute':
      return <DraggableComputeObject {...rest} {...whc} />;

    case 'storage':
      return <DraggableStorageObject {...rest} {...whc} />;

    case 'event':
      return <DraggableEventObject {...rest} {...whc} />;
  }
}
