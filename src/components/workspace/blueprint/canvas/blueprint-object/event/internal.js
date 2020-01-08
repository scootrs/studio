import React, { useRef } from 'react';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';
import useBlueprintContext from '~components/workspace/context';
import Object from '~components/objects';
import { merge } from '~components/workspace/blueprint/canvas/blueprint-object/common';
import View from './view';

const endpoints = [
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

function EventInternalBlueprintObject({ object, onRemove }) {
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
      <Object type="event-internal" width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints)(EventInternalBlueprintObject);
