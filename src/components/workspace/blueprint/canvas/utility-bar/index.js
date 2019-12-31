import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';
import View from './view';
import ObjectComponent from '~components/objects';

const objects = [
  {
    type: 'event-external',
    title: 'External Event',
    id: 'UnnamedExternalEvent',
    eventType: null,
    path: '',
    method: ''
  },
  { type: 'event-internal', title: 'Internal Event', id: 'UnnamedInternalEvent', eventType: null },
  {
    type: 'compute',
    title: 'Compute',
    id: 'UnnamedCompute',
    language: 'javascript',
    runtime: '',
    vcs: '',
    code: '',
    env: [],
    tags: []
  },
  {
    type: 'storage',
    title: 'Storage',
    id: 'UnnamedStorage',
    storageType: null,
    table: '',
    primaryName: '',
    primaryType: ''
  }
];

const ObjectContainer = styled.div`
  position: relative;
  margin: 5px;

  &:first-child {
    margin-top: 10px;
  }
`;

function UtilityBar() {
  return (
    <View>
      {Object.values(objects).map(({ type, title, ...data }) => (
        <ObjectContainer key={type}>
          <Tooltip title={title} position="right">
            <ObjectComponent type={type} draggable={true} data={data} />
          </Tooltip>
        </ObjectContainer>
      ))}
    </View>
  );
}

export default UtilityBar;
