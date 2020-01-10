import React, { useRef } from 'react';
import styled from 'styled-components';
import useDrag from '~hooks/useDrag';
import { Compute, Storage, EventExternal, EventInternal } from '~types';
import ObjectComputeSvg from './object-compute.svg';
import ObjectComputeSvgWhite from './object-compute-white.svg';
import ObjectStorageSvg from './object-storage.svg';
import ObjectStorageSvgWhite from './object-storage-white.svg';
import ObjectEventExternalSvg from './object-event-external.svg';
import ObjectEventExternalWhiteSvg from './object-event-external-white.svg';
import ObjectEventInternalSvg from './object-event-internal.svg';
import ObjectEventInternalWhiteSvg from './object-event-internal-white.svg';

const ResourceContainer = styled.div``;

function Resource({ ...props }) {
  const allProps = {
    width: 40,
    height: 40,
    className: '',
    ...props
  };
  return (
    <ResourceContainer>
      <Svg {...allProps} />
    </ResourceContainer>
  );
}

function Svg({ type, invert = false, draggable = false, ...rest }) {
  switch (type) {
    case Compute:
      const ComputeSvg = invert ? ObjectComputeSvgWhite : ObjectComputeSvg;
      if (draggable) return <DraggableSvg type={type} Svg={ComputeSvg} {...rest} />;
      return <ComputeSvg {...rest} />;

    case Storage:
      const StorageSvg = invert ? ObjectStorageSvgWhite : ObjectStorageSvg;
      if (draggable) return <DraggableSvg type={type} Svg={StorageSvg} {...rest} />;
      return <StorageSvg {...rest} />;

    case EventExternal:
      const EventExternalSvg = invert ? ObjectEventExternalWhiteSvg : ObjectEventExternalSvg;
      if (draggable) return <DraggableSvg type={type} Svg={EventExternalSvg} {...rest} />;
      return <EventExternalSvg {...rest} />;

    case EventInternal:
      const EventInternalSvg = invert ? ObjectEventInternalWhiteSvg : ObjectEventInternalSvg;
      if (draggable) return <DraggableSvg type={type} Svg={EventInternalSvg} {...rest} />;
      return <EventInternalSvg {...rest} />;

    default:
      throw new Error('Failed to render resource: The resource type "' + type + '" is invalid');
  }
}

function DraggableSvg({ type, Svg, ...rest }) {
  const ref = useRef();
  useDrag({
    ref,
    svg: true,
    data: {
      type
    }
  });
  return <Svg ref={ref} {...rest} />;
}

export default Resource;
