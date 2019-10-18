import { useState, useEffect } from 'react';

function useDrop({ ref, onDrop }) {
  const [dropState, updateDropState] = useState('droppable');
  const dropOverCb = ev => {
    ev.preventDefault();
    updateDropState('dragging over');
  };

  const dropCb = ev => {
    ev.preventDefault();
    let data = JSON.parse(ev.dataTransfer.getData('source'));
    onDrop({
      sourceOffsetX: data.offsetX,
      sourceOffsetY: data.offsetY,
      targetOffsetX: ev.offsetX,
      targetOffsetY: ev.offsetY,
      data: data.data
    });
    updateDropState('dropped');
  };
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.addEventListener('dragover', dropOverCb);
      elem.addEventListener('drop', dropCb);
      return () => {
        elem.removeEventListener('dragover', dropOverCb);
        elem.removeEventListener('drop', dropCb);
      };
    }
  });
  return {
    dropState
  };
}

export default useDrop;
