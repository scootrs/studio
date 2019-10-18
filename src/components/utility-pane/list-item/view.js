import React, { forwardRef } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  margin: 5px;
`;

function ListItemView({}, ref) {
  return <ListItem ref={ref} />;
}

export default forwardRef(ListItemView);
