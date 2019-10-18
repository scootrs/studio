import React, { forwardRef } from 'react';
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

function ComputeProviderListView({}, ref) {
  return (
    <ListContainer>
      <ListTitle>Compute Providers</ListTitle>
      <List>
        <ListItem />
        <ListItem />
        <ListItem />
      </List>
    </ListContainer>
  );
}

export default forwardRef(ComputeProviderListView);
