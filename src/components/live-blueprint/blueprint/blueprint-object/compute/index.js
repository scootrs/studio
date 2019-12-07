import React from 'react';
import View from './view';
import ComputeObject from '../../../../objects/compute';
import { withEndpoints } from 'react-plumb/hoc';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: 'Right',
    isSource: true,
    uuid: Math.floor(Math.random() * 100).toString(),
    scope: 'storage event'
  },
  {
    connector: 'Flowchart',
    anchor: 'Left',
    isTarget: true,
    uuid: Math.floor(Math.random() * 100).toString(),
    scope: 'compute'
  }
];

function ComputeBlueprintObject({ object }) {
  return (
    <View id={object.id} selected={object.selected} x={object.x} y={object.y}>
      <ComputeObject />
    </View>
  );
}

export default withEndpoints(endpoints)(ComputeBlueprintObject);
