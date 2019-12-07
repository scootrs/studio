import React, { useContext } from 'react';
import BlueprintContext from '../../../context';
import View from './view';
import StorageObject from '../../../../objects/storage';
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
  const { setCurrent } = useContext(BlueprintContext);

  const onClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setCurrent(object);
  };

  return (
    <View id={object.id} selected={object.selected} x={object.x} y={object.y} onClick={onClick}>
      <StorageObject />
    </View>
  );
}

export default withEndpoints(endpoints)(StorageBlueprintObject);
