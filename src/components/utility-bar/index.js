import React from 'react';
import styled from 'styled-components';
import View from './view';
import { DraggableObject } from '~components/objects';

const types = ['event', 'compute', 'storage'];

const ObjectContainer = styled.div`
  margin: 5px;

  &:first-child {
    margin-top: 10px;
  }
`;

function UtilityBar() {
  return (
    <View>
      {types.map(t => (
        <ObjectContainer key={t}>
          <DraggableObject type={t} />
        </ObjectContainer>
      ))}
    </View>
  );
}

export default UtilityBar;
