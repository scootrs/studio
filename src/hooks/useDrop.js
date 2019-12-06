import { useState, useEffect } from 'react';

function useDrop({ ref, onDrop, svg }) {
  const [dropState, updateDropState] = useState('droppable');
  const dropOverCb = ev => {
    ev.preventDefault();
    updateDropState('dragging over');
  };

  const dropCb = ev => {
    ev.preventDefault();
    let data = JSON.parse(ev.dataTransfer.getData('source'));
    onDrop({
      x: ev.offsetX - data.offsetX,
      y: ev.offsetY - data.offsetY,
      data: data.data
    });
    updateDropState('dropped');
  };

  useEffect(() => {
    const elem = ref.current;
    const dropSvgCb = ev => {
      let rect = elem.getBoundingClientRect();
      if (inDropZone(ev.detail, rect)) {
        onDrop &&
          onDrop({
            x: ev.detail.x - rect.x,
            y: ev.detail.y - rect.y,
            data: ev.detail.data
          });
      }
    };
    if (elem) {
      if (svg) {
        document.addEventListener('dropsvg', dropSvgCb);
      }
      elem.addEventListener('dragover', dropOverCb);
      elem.addEventListener('drop', dropCb);
      return () => {
        elem.removeEventListener('dragover', dropOverCb);
        elem.removeEventListener('drop', dropCb);
        if (svg) {
          document.removeEventListener('dropsvg', dropSvgCb);
        }
      };
    }
  });
  return {
    dropState
  };
}

function inDropZone(ev, rect) {
  return ev.x >= rect.x && ev.x <= rect.x + rect.width && ev.y >= rect.y && ev.y <= rect.y + rect.height;
}

export default useDrop;
