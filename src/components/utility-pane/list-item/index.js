import React, { useRef } from 'react';
import ListItemView from './view';
import useDrag from '../../../hooks/useDrag';

function ListItem({ provider }) {
  const dragRef = useRef();
  useDrag({
    data: provider,
    ref: dragRef
  });
  return <ListItemView ref={dragRef} id={provider.id} />;
}

export default ListItem;
