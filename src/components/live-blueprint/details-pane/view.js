import React from 'react';
import styled from 'styled-components';

const DetailsPaneRoot = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: -1px 1px 3px ${({ theme }) => theme.colors.backgrounds.medium};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DetailsPaneTitle = styled.h2`
  padding: 0px 5px;
`;

function DetailsPaneView() {
  return (
    <DetailsPaneRoot>
      <DetailsPaneTitle>Details</DetailsPaneTitle>
    </DetailsPaneRoot>
  );
}

export default DetailsPaneView;
