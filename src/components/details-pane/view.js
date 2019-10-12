import React from 'react';
import styled from 'styled-components';

const DetailsPaneRoot = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: -1px 1px 3px ${({ theme }) => theme.colors.backgrounds.medium};
`;

function DetailsPaneView() {
  return (
    <DetailsPaneRoot>
      <p>Hello, world!</p>
    </DetailsPaneRoot>
  );
}

export default DetailsPaneView;
