import React from 'react';

import ComputeObject from './compute';
import StorageObject from './storage';
import EventObject from './event';

function Object({ type, ...rest }) {
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

export default Object;
