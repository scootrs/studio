import React from 'react';
import styled from 'styled-components';
import View from './view';
import ObjectComponent from '~components/objects';

const objects = [
  { type: 'event', id: 'UnnamedEvent', eventType: null, path: '', method: '' },
  { type: 'compute', id: 'UnnamedCompute', language: 'javascript', runtime: '', vcs: '', code: '', env: [], tags: [] },
  { type: 'storage', id: 'UnnamedStorage', storageType: null, table: '', primaryName: '', primaryType: '' }
];

const ObjectContainer = styled.div`
  margin: 5px;

  &:first-child {
    margin-top: 10px;
  }
`;

function UtilityBar() {
  return (
    <View>
      {Object.values(objects).map(({ type, ...data }) => (
        <ObjectContainer key={type}>
          <ObjectComponent type={type} draggable={true} data={data} />
        </ObjectContainer>
      ))}
    </View>
  );
}

export default UtilityBar;
