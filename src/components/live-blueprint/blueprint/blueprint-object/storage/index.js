import React, { useContext } from 'react';
import useBlueprintContext from '~components/live-blueprint/context';
import View from './view';
import StorageObject from '~components/objects/storage';
import { withEndpoints } from 'react-plumb/hoc';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: 'Left',
    isTarget: true,
    uuid: Math.floor(Math.random() * 100).toString(),
    scope: 'storage'
  }
];

function StorageBlueprintObject({ object }) {
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
      <StorageObject />
    </View>
  );
}

export default withEndpoints(endpoints)(StorageBlueprintObject);
