import React from 'react';
import Tooltip from '~styles/tooltip';
import styled from 'styled-components';
import View from './view';
import Resource from '~components/resources';
import { Compute, Storage, EventInternal, EventExternal } from '~types';

const types = [
  { type: Compute, title: 'Compute' },
  { type: Storage, title: 'Storage' },
  { type: EventExternal, title: 'External Event' },
  { type: EventInternal, title: 'Internal Event' }
];

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
    <View>
      {types.map(({ type, title }) => (
        <Container key={title}>
          <Tooltip title={title} position="right">
            <StyledResource type={type} draggable={true} />
          </Tooltip>
        </Container>
      ))}
    </View>
  );
}

export default UtilityBar;
