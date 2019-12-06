import React from 'react';

import ComputeObject, { DraggableComputeObject } from './compute';
import StorageObject, { DraggableStorageObject } from './storage';
import EventObject, { DraggableEventObject } from './event';

export default function Object({ type, ...rest }) {
  let wh = { width: 40, height: 40 };
  switch (type) {
    case 'compute':
      return <ComputeObject {...rest} {...wh} />;

    case 'storage':
      return <StorageObject {...rest} {...wh} />;

    case 'event':
      return <EventObject {...rest} {...wh} />;
  }
}

export function DraggableObject({ type, ...rest }) {
  let wh = { width: 40, height: 40 };
  switch (type) {
    case 'compute':
      return <DraggableComputeObject {...rest} {...wh} />;

    case 'storage':
      return <DraggableStorageObject {...rest} {...wh} />;

    case 'event':
      return <DraggableEventObject {...rest} {...wh} />;
  }
}
