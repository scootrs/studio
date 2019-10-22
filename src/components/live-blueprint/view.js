import React from 'react';
import styled from 'styled-components';
import DetailsPane from './details-pane';
import Blueprint from './blueprint';
import Split from 'react-split';

const SplitBlueprintContainer = styled(Split)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: auto;
`;

const BlueprintViewportContainer = styled.div`
  flex-grow: 1;
`;

const DetailsContainer = styled.div`
  max-width: 800px;
`;

function LiveBlueprintView() {
  return (
    <SplitBlueprintContainer>
      <BlueprintViewportContainer>
        <Blueprint />
      </BlueprintViewportContainer>
      <DetailsContainer>
        <DetailsPane />
      </DetailsContainer>
    </SplitBlueprintContainer>
  );
}

export default LiveBlueprintView;
