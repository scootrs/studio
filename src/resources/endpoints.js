import uuid from 'uuid/v4';
import { Compute, Storage, EventInternal, EventExternal } from '~types';

const defaults = {
  connector: ['Flowchart', { cornerRadius: 5, stub: 10, alwaysRespectStubs: true }],
  maxConnections: -1,
  endpoint: ['Dot', { radius: 5 }]
};

export function applyThemeToEndpoints(endpoints, theme) {
  const newEndpoints = [];
  for (let e of endpoints) {
    newEndpoints.push({
      ...e,
      connectorStyle: {
        stroke: theme.mode === 'light' ? theme.colors.backgrounds.medium : theme.colors.backgrounds.light,
        strokeWidth: 5,
        dashstyle: e.connectorStyle && e.connectorStyle.dashstyle ? e.connectorStyle.dashstyle : ''
      },
      paintStyle: {
        width: 5,
        height: 5,
        fill: theme.mode === 'light' ? theme.colors.backgrounds.medium : theme.colors.backgrounds.light
      }
    });
  }
  return newEndpoints;
}

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

export function createComputeEndpoints() {
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

export function createStorageEndpoints() {
  return [
    merge({
      isTarget: true,
      uuid: uuid(),
      scope: 'storage'
    })
  ];
}

export function createExternalEventEndpoints() {
  return [
    merge({
      isSource: true,
      uuid: uuid(),
      scope: 'compute',
      dashed: true
    })
  ];
}

export function createInternalEventEndpoints() {
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
