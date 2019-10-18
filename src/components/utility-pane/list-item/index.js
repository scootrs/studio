import React, { useRef } from 'react';
import ListItemView from './view';
import useDrag from '../../../hooks/useDrag';

function ListItem() {
  const dragRef = useRef();
  useDrag({
    id: 'test',
    ref: dragRef,
    onDragStart: () => console.log('dragging'),
    onDragEnd: () => console.log('dropped')
  });
  return <ListItemView ref={dragRef} />;
}

export default ListItem;
