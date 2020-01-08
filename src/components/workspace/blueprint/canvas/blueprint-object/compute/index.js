import React, { useRef } from 'react';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';
import Object from '~components/objects';
import useWorkspaceContext from '~components/workspace/context';
import { merge } from '~components/workspace/blueprint/canvas/blueprint-object/common';
import View from './view';

const endpoints = [
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
      <Object type="compute" width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints)(ComputeBlueprintObject);
