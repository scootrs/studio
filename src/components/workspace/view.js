import React from 'react';
import styled from 'styled-components';
import Split from 'react-split';
import theme from '~styles/theme';

const SplitBlueprintContainer = styled(Split)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

function LiveBlueprintView({ children }) {
  const gutterStyle = () => ({
    width: '3px',
    backgroundColor: theme.colors.backgrounds.main
  });

  return (
    <SplitBlueprintContainer minSize={300} gutterStyle={gutterStyle}>
      {children}
    </SplitBlueprintContainer>
  );
}

export default LiveBlueprintView;
