import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import EventObjectSvg from './object-event.svg';

export default function EventObject(props = {}) {
  return <EventObjectSvg  {...props} />;
}

export function DraggableEventObject(props = {}) {
  const ref = useRef();
  useDrag({
    ref,
    data: {
      type: 'event'
    },
    svg: true
  });
  return <EventObjectSvg ref={ref} {...props} />;
}
