import React from 'react';
import styled from 'styled-components';

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

const ListItem = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  margin: 5px;
`;

function StorageProviderListView() {
  return (
    <ListContainer>
      <ListTitle>Storage Providers</ListTitle>
      <List>
        <ListItem />
        <ListItem />
        <ListItem />
      </List>
    </ListContainer>
  );
}

export default StorageProviderListView;
