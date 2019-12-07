import React from 'react';
import styled from 'styled-components';
import DetailsPane from './details-pane';
import Blueprint from './blueprint';
import Split from 'react-split';

const SplitBlueprintContainer = styled(Split)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

const BlueprintViewportContainer = styled.div`
  flex-grow: 1;
  min-height: min-content;
  display: flex;
`;

const DetailsContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  min-height: min-content;
`;

function LiveBlueprintView() {
  return (
    <SplitBlueprintContainer
      sizes={[50,50]}
      minSize={300}>
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
