import React from 'react';
import styled from 'styled-components';
import { FlexTabPanel, FlexTabs } from '~styles/tabs';

const StorageDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const StorageDetailsTitle = styled.div``;

function StorageDetailsView({ children }) {
  return (
    <StorageDetailsRoot>
      <StorageDetailsTitle>
        <h2>Storage</h2>
      </StorageDetailsTitle>
      <FlexTabs>
        {React.Children.toArray(children).map(child => (
          <FlexTabPanel key={child.props.name} name={child.props.name}>
            {child}
          </FlexTabPanel>
        ))}
      </FlexTabs>
    </StorageDetailsRoot>
  );
}

export default StorageDetailsView;
