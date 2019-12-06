import { useEffect } from 'react';

const useDrag = ({ svg, ...rest }) => {
  if (svg) {
    useDragSvg(rest);
  } else {
    useDragDom(rest);
  }
};

function useDragDom({ data, effect, ref, onDragStart, onDragOver, onDragEnd }) {
  const dragStartCb = ev => {
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
    onDragOver && onDragOver();
  };

  const dragEndCb = ev => {
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
}

function useDragSvg({ data, ref, onDragStart, onDragOver, onDragEnd }) {
  let clone = null;
  let pos = { x: 0, y: 0, screenX: 0, screenY: 0, offsetX: 0, offsetY: 0 };
  function svgDragStart(ev) {
    clone = ref.current.cloneNode(true);
    clone.id = 'ghost';
    clone.style.opacity = '0.5';
    clone.style.position = 'absolute';
    pos.x = ev.clientX - ev.offsetX;
    pos.y = ev.clientY - ev.offsetY;
    pos.screenX = ev.screenX;
    pos.screenY = ev.screenY;
    pos.offsetX = ev.offsetX;
    pos.offsetY = ev.offsetY;
    clone.style.left = pos.x + 'px';
    clone.style.top = pos.y + 'px';
    document.body.appendChild(clone);
    document.addEventListener('mousemove', svgDragOver);
    document.addEventListener('mouseup', svgDragEnd);
    onDragStart && onDragStart();
  }

  function svgDragOver(ev) {
    pos.x = pos.x + (ev.screenX - pos.screenX);
    pos.y = pos.y + (ev.screenY - pos.screenY);
    pos.screenX = ev.screenX;
    pos.screenY = ev.screenY;
    clone.style.left = pos.x + 'px';
    clone.style.top = pos.y + 'px';
    onDragOver && onDragOver();
  }

  function svgDragEnd(ev) {
    document.removeEventListener('mousemove', svgDragOver);
    document.removeEventListener('mouseup', svgDragEnd);
    document.body.removeChild(clone);
    clone = null;
    onDragEnd && onDragEnd();
    let event = new CustomEvent('dropsvg', { detail: { x: ev.x - pos.offsetX, y: ev.y - pos.offsetY, data } });
    document.dispatchEvent(event);
  }
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.addEventListener('mousedown', svgDragStart);
      return () => {
        elem.removeEventListener('mousedown', svgDragStart);
      };
    }
  }, []);
}

export default useDrag;
