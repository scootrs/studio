import React from 'react';
import styled from 'styled-components';

import ResourceDetails from 'edaam/ResourceDetails';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 1px 1px 3px ${({ theme }) => theme.colors.backgrounds.medium};
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

function DetailsPane() {
  return (
    <ViewRoot>
      <ResourceDetails />
    </ViewRoot>
  );
}

export default DetailsPane;
