import React from 'react';
import styled from 'styled-components';

const MustSelectRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items; center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

const MustSelectMessage = styled.div`
  text-align: center;
  padding: 10px;
  font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fonts.medium};
`;

export default function MustSelectPane() {
  return (
    <MustSelectRoot>
      <MustSelectMessage>Please select an object from the blueprint to view details</MustSelectMessage>
    </MustSelectRoot>
  );
}
