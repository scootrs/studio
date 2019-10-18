import React, { useRef } from 'react';
import ListItemView from './view';
import useDrag from '../../../hooks/useDrag';

function ListItem() {
  const dragRef = useRef();
  useDrag({
    data: 'test',
    ref: dragRef
  });
  return <ListItemView ref={dragRef} />;
}

export default ListItem;
