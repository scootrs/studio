import React from 'react';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';
import ComputeObject from '~components/objects/compute';
import useWorkspaceContext from '~components/workspace/context';
import commonEndpointOptions from '~components/workspace/blueprint/canvas/blueprint-object/common';
import View from './view';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: 'Right',
    isSource: true,
    uuid: uuid(),
    scope: 'storage event'
  },
  {
    connector: 'Flowchart',
    anchor: 'Left',
    isTarget: true,
    uuid: uuid(),
    scope: 'compute'
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
      <ComputeObject width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints, commonEndpointOptions)(ComputeBlueprintObject);
