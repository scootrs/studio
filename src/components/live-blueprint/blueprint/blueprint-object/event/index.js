import React, { useContext } from 'react';
import useBlueprintContext from '~components/live-blueprint/context';
import View from './view';
import EventObject from '~components/objects/event';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: 'Right',
    isSource: true,
    uuid: uuid(),
    scope: 'compute'
  }
];

function EventBlueprintObject({ object }) {
  const {
    selected,
    actions: { onSelectObject }
  } = useBlueprintContext();

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    onSelectObject(object);
  };

  return (
    <View id={object.id} selected={object.id === selected} x={object.x} y={object.y} onClick={onClick}>
      <EventObject />
    </View>
  );
}

export default withEndpoints(endpoints)(EventBlueprintObject);
