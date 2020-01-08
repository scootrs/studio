import React, { useRef } from 'react';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';
import useBlueprintContext from '~components/workspace/context';
import Object from '~components/objects';
import commonEndpointOptions from '~components/workspace/blueprint/canvas/blueprint-object/common';
import View from './view';

const endpoints = [
  {
    connector: 'Flowchart',
    connectorStyle: {
      ...commonEndpointOptions.connectorStyle,
      dashstyle: '2 2'
    },
    anchor: [1, 0.5, 1, 0, 6, 0],
    isSource: true,
    uuid: uuid(),
    scope: 'compute',
    endpoint: ['Dot', { radius: 5 }]
  }
];

function EventExternalBlueprintObject({ object, onRemove }) {
  const ref = useRef();
  const {
    selected,
    actions: { setSelected }
  } = useBlueprintContext();

  const onClick = ev => {
    ev.didSetSelected = true;
    ref.current.focus();
    setSelected(object);
  };

  const onKeyPress = ev => {
    if (ev.key === 'Delete') {
      onRemove(object);
    }
  };

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
      <Object type="event-external" width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints, commonEndpointOptions)(EventExternalBlueprintObject);
