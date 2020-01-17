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

function LiveBlueprintView({ children, onDrag }) {
  const gutterStyle = () => ({
    width: '3px',
    backgroundColor: theme.colors.backgrounds.light
  });

  return (
    <SplitBlueprintContainer minSize={[720, 300]} gutterStyle={gutterStyle} onDrag={onDrag} onDragEnd={onDrag}>
      {children}
    </SplitBlueprintContainer>
  );
}

export default LiveBlueprintView;
