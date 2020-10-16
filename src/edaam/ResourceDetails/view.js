import React from 'react';
import styled from 'styled-components';

const ViewContent = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
`;

const ViewScrollBox = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: min-content;
`;

function ResourceDetailsView({ children, onClick, onKeyDown }) {
  return (
    <ViewContent tabIndex={-1} onClick={onClick} onKeyDown={onKeyDown}>
      <ViewScrollBox>{children}</ViewScrollBox>
    </ViewContent>
  );
}

export default ResourceDetailsView;
