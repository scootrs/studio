import React, { useRef } from 'react';
import styled from 'styled-components';
import useDrag from '~hooks/useDrag';
import { Compute, Storage, EventExternal, EventInternal } from '~types';
import ResourceComputeSvg from './resource-compute.svg';
import ResourceStorageSvg from './resource-storage.svg';
import ResourceEventExternalSvg from './resource-event-external.svg';
import ResourceEventInternalSvg from './resource-event-internal.svg';

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
      const ComputeSvg = ResourceComputeSvg;
      if (draggable) return <DraggableSvg type={type} Svg={ComputeSvg} {...rest} />;
      return <ComputeSvg {...rest} />;

    case Storage:
      const StorageSvg = ResourceStorageSvg;
      if (draggable) return <DraggableSvg type={type} Svg={StorageSvg} {...rest} />;
      return <StorageSvg {...rest} />;

    case EventExternal:
      const EventExternalSvg = ResourceEventExternalSvg;
      if (draggable) return <DraggableSvg type={type} Svg={EventExternalSvg} {...rest} />;
      return <EventExternalSvg {...rest} />;

    case EventInternal:
      const EventInternalSvg = ResourceEventInternalSvg;
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
