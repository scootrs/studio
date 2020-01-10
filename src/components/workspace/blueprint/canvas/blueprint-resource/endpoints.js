import uuid from 'uuid/v4';
import theme from '~styles/theme';
import { Compute, Storage, EventInternal, EventExternal } from '~types';

const defaults = {
  connector: ['Flowchart', { cornerRadius: 5, stub: 10, alwaysRespectStubs: true }],
  connectorStyle: {
    stroke: theme.colors.backgrounds.medium,
    strokeWidth: 5
  },
  paintStyle: {
    width: 5,
    height: 5,
    fill: theme.colors.backgrounds.medium
  },
  maxConnections: -1,
  endpoint: ['Dot', { radius: 5 }]
};

function merge(options) {
  if (options.isSource) options.anchor = [1, 0.5, 1, 0, 6, 0];
  else if (options.isTarget) options.anchor = [0, 0.5, -1, 0, -6, 0];
  if (options.dashed)
    options.connectorStyle = {
      ...defaults.connectorStyle,
      dashstyle: '2 2'
    };

  return {
    ...defaults,
    ...options
  };
}

function createComputeEndpoints() {
  return [
    merge({
      isSource: true,
      uuid: uuid(),
      scope: 'storage event-internal'
    }),
    merge({
      isTarget: true,
      uuid: uuid(),
      scope: 'compute'
    })
  ];
}

function createStorageEndpoints() {
  return [
    merge({
      isTarget: true,
      uuid: uuid(),
      scope: 'storage'
    })
  ];
}

function createExternalEventEndpoints() {
  return [
    merge({
      isSource: true,
      uuid: uuid(),
      scope: 'compute',
      dashed: true
    })
  ];
}

function createInternalEventEndpoints() {
  return [
    merge({
      isSource: true,
      uuid: uuid(),
      scope: 'compute',
      dashed: true
    }),
    merge({
      isTarget: true,
      uuid: uuid(),
      scope: 'event-internal',
      dashed: true
    })
  ];
}

export function createEndpointsForType(type) {
  switch (type) {
    case Compute:
      return createComputeEndpoints();

    case Storage:
      return createStorageEndpoints();

    case EventInternal:
      return createInternalEventEndpoints();

    case EventExternal:
      return createExternalEventEndpoints();

    default:
      throw new Error('Failed to create endpoints: The type "' + type.toString() + '" is invalid');
  }
}
