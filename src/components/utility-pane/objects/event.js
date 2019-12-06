import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import EventObjectSvg from '../../../../assets/vectors/object-event.svg';

function EventObject(props = {}) {
  const ref = useRef();
  useDrag({
    ref,
    data: 'event',
    svg: true
  });
  return <EventObjectSvg ref={ref} {...props} />;
}

export default EventObject;
