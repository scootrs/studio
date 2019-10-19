import React from 'react';
import styled from 'styled-components';
import ListItem from '../list-item';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ListTitle = styled.h3`
  color: ${({ theme }) => theme.colors.fonts.light};
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content; space-between;
  flex-wrap: wrap;
`;

function StorageProviderListView({ providers }) {
  return (
    <ListContainer>
      <ListTitle>Storage Providers</ListTitle>
      <List>{providers ? providers.map(p => <ListItem key={p.id} provider={p} />) : ''}</List>
    </ListContainer>
  );
}

export default StorageProviderListView;
