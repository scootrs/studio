import React, { useRef } from 'react';
import useDrag from '~hooks/useDrag';
import ObjectComputeSvg from './object-compute.svg';
import ObjectComputeSvgWhite from './object-compute-white.svg';
import ObjectStorageSvg from './object-storage.svg';
import ObjectStorageSvgWhite from './object-storage-white.svg';
import ObjectEventSvg from './object-event.svg';
import ObjectEventSvgWhite from './object-event-white.svg';

export default function Object({ ...rest }) {
  const props = {
    width: 40,
    height: 40,
    className: '',
    ...rest
  };
  return <Svg {...props} />;
}

function Svg({ type, invert = false, draggable = false, ...rest }) {
  switch (type) {
    case 'compute':
      const ComputeSvg = invert ? ObjectComputeSvgWhite : ObjectComputeSvg;
      if (draggable) return <DraggableSvg type={type} Svg={ComputeSvg} {...rest} />;
      return <ComputeSvg {...rest} />;

    case 'storage':
      const StorageSvg = invert ? ObjectStorageSvgWhite : ObjectStorageSvg;
      if (draggable) return <DraggableSvg type={type} Svg={StorageSvg} {...rest} />;
      return <StorageSvg {...rest} />;

    case 'event':
      const EventSvg = invert ? ObjectEventSvgWhite : ObjectEventSvg;
      if (draggable) return <DraggableSvg type={type} Svg={EventSvg} {...rest} />;
      return <EventSvg {...rest} />;

    default:
      console.warn('Failed to render object type ' + type);
  }
}

function DraggableSvg({ type, data = {}, Svg, ...rest }) {
  const ref = useRef();
  useDrag({
    ref,
    svg: true,
    data: {
      type,
      config: {
        ...data
      },
      monitor: {}
    }
  });
  return <Svg ref={ref} {...rest} />;
}
