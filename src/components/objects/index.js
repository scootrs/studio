import React, { useRef } from 'react';
import useDrag from '~hooks/useDrag';
import ObjectComputeSvg from './object-compute.svg';
import ObjectComputeSvgWhite from './object-compute-white.svg';
import ObjectStorageSvg from './object-storage.svg';
import ObjectStorageSvgWhite from './object-storage-white.svg';
import ObjectEventExternalSvg from './object-event-external.svg';
import ObjectEventExternalWhiteSvg from './object-event-external-white.svg';
import ObjectEventInternalSvg from './object-event-internal.svg';
import ObjectEventInternalWhiteSvg from './object-event-internal-white.svg';
import styled from 'styled-components';

const ObjectComponentContainer = styled.div``;

function ObjectComponent({ ...rest }) {
  const props = {
    width: 40,
    height: 40,
    className: '',
    ...rest
  };
  return (
    <ObjectComponentContainer>
      <Svg {...props} />
    </ObjectComponentContainer>
  );
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

    case 'event-external':
      const EventExternalSvg = invert ? ObjectEventExternalWhiteSvg : ObjectEventExternalSvg;
      if (draggable) return <DraggableSvg type={type} Svg={EventExternalSvg} {...rest} />;
      return <EventExternalSvg {...rest} />;

    case 'event-internal':
      const EventInternalSvg = invert ? ObjectEventInternalWhiteSvg : ObjectEventInternalSvg;
      if (draggable) return <DraggableSvg type={type} Svg={EventInternalSvg} {...rest} />;
      return <EventInternalSvg {...rest} />;

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

export default ObjectComponent;
