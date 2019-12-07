import React from 'react';
import styled from 'styled-components';
import { FlexTabPanel, FlexTabs } from '~styles/tabs';

const ComputeDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const ComputeDetailsTitle = styled.div``;

function ComputeDetailsView({ children }) {
  return (
    <ComputeDetailsRoot>
      <ComputeDetailsTitle>
        <h2>Compute</h2>
      </ComputeDetailsTitle>
      <FlexTabs>
        {React.Children.toArray(children).map(child => (
          <FlexTabPanel key={child.props.name} name={child.props.name}>
            {child}
          </FlexTabPanel>
        ))}
      </FlexTabs>
    </ComputeDetailsRoot>
  );
}

export default ComputeDetailsView;
