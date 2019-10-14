import React from 'react';
import styled from 'styled-components';
import DetailsPane from './details-pane';

const BlueprintContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const BlueprintViewportContainer = styled.div`
  flex-grow: 1;
`;

const DetailsContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 300px;
  align-self: flex-end;
  flex-shrink: 1;
`;

function LiveBlueprintView() {
  return (
    <BlueprintContainer>
      <BlueprintViewportContainer />
      <DetailsContainer>
        <DetailsPane />
      </DetailsContainer>
    </BlueprintContainer>
  );
}

export default LiveBlueprintView;
