import React, { useContext } from 'react';
import View from './view';
import ComputeObject from '../../../../objects/compute';
import BlueprintContext from '../../../context';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';

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
  const { setCurrent } = useContext(BlueprintContext);

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setCurrent(object);
  };

  return (
    <View id={object.id} selected={object.selected} x={object.x} y={object.y} onClick={onClick}>
      <ComputeObject />
    </View>
  );
}

export default withEndpoints(endpoints)(ComputeBlueprintObject);
