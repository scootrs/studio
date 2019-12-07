import React from 'react';
import styled from 'styled-components';
import Split from 'react-split';

const SplitBlueprintContainer = styled(Split)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

function LiveBlueprintView({ children }) {
  return (
    <SplitBlueprintContainer minSize={300}>
      {children}
    </SplitBlueprintContainer>
  );
}

export default LiveBlueprintView;
