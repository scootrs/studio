import React from 'react';
import styled from 'styled-components';
import View from './view';
import Object from './objects';

const types = ['compute', 'storage', 'event'];

const ObjectContainer = styled.div`
  margin: 5px;

  &:first-child {
    margin-top: 10px;
  }
`;

function UtilityPane() {
  return (
    <View>
      {types.map(t => (
        <ObjectContainer key={t}>
          <Object type={t} />
        </ObjectContainer>
      ))}
    </View>
  );
}

export default UtilityPane;
