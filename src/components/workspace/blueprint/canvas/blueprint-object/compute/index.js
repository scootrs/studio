import React from 'react';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';
import Object from '~components/objects';
import useWorkspaceContext from '~components/workspace/context';
import commonEndpointOptions from '~components/workspace/blueprint/canvas/blueprint-object/common';
import View from './view';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: [1, 0.5, 1, 0, 6, 0],
    isSource: true,
    uuid: uuid(),
    scope: 'storage event',
    endpoint: ['Dot', { radius: 5 }]
  },
  {
    connector: 'Flowchart',
    anchor: [0, 0.5, -1, 0, -6, 0],
    isTarget: true,
    uuid: uuid(),
    scope: 'compute',
    endpoint: ['Dot', { radius: 5 }]
  }
];

function ComputeBlueprintObject({ object }) {
  const {
    selected,
    actions: { setSelected }
  } = useWorkspaceContext();

  const onClick = ev => {
    ev.didSetSelected = true;
    setSelected(object);
  };

  return (
    <View id={object.id} selected={selected && selected.id === object.id} x={object.x} y={object.y} onClick={onClick}>
      <Object type="compute" width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints, commonEndpointOptions)(ComputeBlueprintObject);
