import { useState, useEffect } from 'react';

const useDrag = ({ data, effect, ref, onDragStart, onDragOver, onDragEnd }) => {
  const [dragState, updateDragState] = useState('draggable');
  const dragStartCb = ev => {
    updateDragState('dragStart');
    ev.dataTransfer.dropEffect = effect;
    let pkg = {
      offsetX: ev.offsetX,
      offsetY: ev.offsetY,
      data
    };
    ev.dataTransfer.setData('source', JSON.stringify(pkg));
    onDragStart && onDragStart();
  };
  const dragOverCb = ev => {
    updateDragState('dragging');
    onDragOver && onDragOver();
  };

  const dragEndCb = ev => {
    updateDragState('draggable');
    // if (effect === "move") {
    //   updateDragState("moved");
    // }
    onDragEnd && onDragEnd();
  };
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.setAttribute('draggable', true);
      elem.addEventListener('dragstart', dragStartCb);
      elem.addEventListener('dragover', dragOverCb);
      elem.addEventListener('dragend', dragEndCb);
      return () => {
        elem.removeEventListener('dragstart', dragStartCb);
        elem.removeEventListener('dragover', dragOverCb);
        elem.removeEventListener('dragend', dragEndCb);
      };
    }
  }, []);
  return {
    dragState: dragState
  };
};

export default useDrag;
