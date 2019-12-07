import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import EventObjectSvg from './object-event.svg';

export default function EventObject({ width = 40, height = 40, ...rest }) {
  return <EventObjectSvg width={width} height={height} {...rest} />;
}

export function DraggableEventObject({ width = 40, height = 40, ...rest }) {
  const ref = useRef();
  const type = 'event';
  useDrag({
    ref,
    data: {
      info: {
        type
      },
      config: {
        type
      }
    },
    svg: true
  });
  return <EventObjectSvg ref={ref} width={width} height={height} {...rest} />;
}
