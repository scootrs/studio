import React from 'react';
import styled from 'styled-components';
import { FlexTabPanel, FlexTabs } from '~styles/tabs';

const ConnectionDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const ConnectionDetailsTitle = styled.div``;

function ConnectionDetailsView({ children }) {
  return (
    <ConnectionDetailsRoot>
      <ConnectionDetailsTitle>
        <h2>Connection</h2>
      </ConnectionDetailsTitle>
      <FlexTabs>
        {React.Children.toArray(children).map(child => (
          <FlexTabPanel key={child.props.name} name={child.props.name}>
            {child}
          </FlexTabPanel>
        ))}
      </FlexTabs>
    </ConnectionDetailsRoot>
  );
}

export default ConnectionDetailsView;
