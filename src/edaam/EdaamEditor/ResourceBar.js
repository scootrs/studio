import React from 'react';
import styled from 'styled-components';

import Tooltip from 'shared/styles/tooltip';
import Resource from 'shared/components/DraggableResourceIcon';
import ExternalEventSvg from 'edaam/event/external-event.svg';
import InternalEventSvg from 'edaam/event/internal-event.svg';
import HandlerSvg from 'edaam/handler/handler.svg';
import StorageSvg from 'edaam/storage/storage.svg';

const types = [
  { type: 'external-event', title: 'External Event', Svg: ExternalEventSvg },
  { type: 'handler', title: 'Handler', Svg: HandlerSvg },
  { type: 'storage', title: 'Storage', Svg: StorageSvg },
  { type: 'internal-event', title: 'Internal Event', Svg: InternalEventSvg },
];

const Bar = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) =>
    theme.mode === 'light' ? theme.colors.backgrounds.light : theme.colors.backgrounds.medium};
  color: ${({ theme }) => theme.colors.fonts.light};
  min-width: 60px;
  flex-shrink: 0;
`;

const Container = styled.div`
  position: relative;
  margin: 5px;

  &:first-child {
    margin-top: 10px;
  }
`;

const StyledResource = styled(Resource)`
  &:hover {
    cursor: move;
  }

  &:focus {
    outline: none;
  }

  &:active {
    cursor: move;
  }
`;

function UtilityBar() {
  return (
    <Bar>
      {types.map(({ type, title, Svg }) => (
        <Container key={title}>
          <Tooltip title={title} position="right">
            <StyledResource type={type} Svg={Svg} />
          </Tooltip>
        </Container>
      ))}
    </Bar>
  );
}

export default UtilityBar;
