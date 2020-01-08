import React, { useRef } from 'react';
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
    scope: 'storage event-internal',
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

function ComputeBlueprintObject({ object, onRemove }) {
  const ref = useRef();
  const {
    selected,
    actions: { setSelected }
  } = useWorkspaceContext();

  const onClick = ev => {
    ev.didSetSelected = true;
    ref.current.focus();
    setSelected(object);
  };

  const onKeyPress = ev => {
    if(ev.key === 'Delete') {
      onRemove(object);
    }
  }

  return (
    <View
      ref={ref}
      id={object.id}
      selected={selected && selected.id === object.id}
      x={object.x}
      y={object.y}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      <Object type="compute" width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints, commonEndpointOptions)(ComputeBlueprintObject);
