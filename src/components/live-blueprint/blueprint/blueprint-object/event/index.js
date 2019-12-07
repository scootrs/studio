import React, { useContext } from 'react';
import BlueprintContext from '../../../context';
import View from './view';
import EventObject from '../../../../objects/event';
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
  const { setCurrent } = useContext(BlueprintContext);

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setCurrent(object);
  };

  return (
    <View id={object.id} selected={object.selected} x={object.x} y={object.y} onClick={onClick}>
      <EventObject />
    </View>
  );
}

export default withEndpoints(endpoints)(EventBlueprintObject);
