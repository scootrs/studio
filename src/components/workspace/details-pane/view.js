import React from 'react';
import styled from 'styled-components';

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

function DetailsPaneView({ children, onClick, onKeyDown }) {
  return (
    <ViewRoot tabIndex={-1} onClick={onClick} onKeyDown={onKeyDown}>
      <ViewContent>
        <ViewScrollBox>{children}</ViewScrollBox>
      </ViewContent>
    </ViewRoot>
  );
}

export default DetailsPaneView;
