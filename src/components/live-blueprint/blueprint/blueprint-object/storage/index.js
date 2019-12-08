import React, { useContext } from 'react';
import useBlueprintContext from '~components/live-blueprint/context';
import View from './view';
import StorageObject from '~components/objects/storage';
import { withEndpoints } from 'react-plumb/hoc';
import uuid from 'uuid/v4';

const endpoints = [
  {
    connector: 'Flowchart',
    anchor: 'Left',
    isTarget: true,
    uuid: uuid(),
    scope: 'storage'
  }
];

function StorageBlueprintObject({ object }) {
  const {
    selected,
    actions: { setSelected }
  } = useBlueprintContext();

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setSelected(object);
  };

  return (
    <View id={object.id} selected={object.id === selected} x={object.x} y={object.y} onClick={onClick}>
      <StorageObject width={60} height={60} />
    </View>
  );
}

export default withEndpoints(endpoints)(StorageBlueprintObject);
