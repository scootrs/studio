import uuid from 'uuid/v4';
import { Compute, Storage, EventInternal, EventExternal } from '~types';

export function applyThemeToEndpoints(endpoints, theme) {
  const newEndpoints = [];
  for (let e of endpoints) {
    let ne = {
      ...e,
      connector: ['Flowchart', { cornerRadius: 5, stub: 10, alwaysRespectStubs: true }],
      maxConnections: -1,
      endpoint: ['Dot', { radius: 7 }]
    };

    if (e.isSource) {
      ne.anchor = [1, 0.5, 1, 0, 8, 0];
    } else if (e.isTarget) {
      ne.anchor = [0, 0.5, -1, 0, -8, 0];
    }

    ne.connectorStyle = {
      stroke: theme.colors.static.endpoints[theme.mode],
      strokeWidth: 5
    };

    if (e.dashed) {
      ne.connectorStyle.dashstyle = '2 2';
    }

    ne.paintStyle = {
      width: 5,
      height: 5,
      fill: theme.colors.static.endpoints[theme.mode]
    };

    newEndpoints.push(ne);
  }
  return newEndpoints;
}

export function createComputeEndpoints() {
  return [
    {
      isSource: true,
      uuid: uuid(),
      scope: 'storage event-internal'
    },
    {
      isTarget: true,
      uuid: uuid(),
      scope: 'compute'
    }
  ];
}

export function createStorageEndpoints() {
  return [
    {
      isTarget: true,
      uuid: uuid(),
      scope: 'storage'
    }
  ];
}

export function createExternalEventEndpoints() {
  return [
    {
      isSource: true,
      uuid: uuid(),
      scope: 'compute',
      dashed: true
    }
  ];
}

export function createInternalEventEndpoints() {
  return [
    {
      isSource: true,
      uuid: uuid(),
      scope: 'compute',
      dashed: true
    },
    {
      isTarget: true,
      uuid: uuid(),
      scope: 'event-internal',
      dashed: true
    }
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
