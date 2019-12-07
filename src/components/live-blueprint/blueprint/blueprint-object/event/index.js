import React from 'react';
import View from './view';
import EventObject from '../../../../objects/event';
import { withEndpoints } from 'react-plumb/hoc';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: 'Right',
    isSource: true,
    uuid: Math.floor(Math.random() * 100).toString(),
    scope: 'compute'
  }
];

function EventBlueprintObject({ object }) {
  return (
    <View id={object.id} selected={object.selected} x={object.x} y={object.y}>
      <EventObject />
    </View>
  );
}

export default withEndpoints(endpoints)(EventBlueprintObject);
