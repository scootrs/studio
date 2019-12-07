import React from 'react';
import styled from 'styled-components';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ComputeDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ComputeDetailsTitle = styled.div``;

const StyledTabs = styled(Tabs)`
  height: 100%;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0px 10px;
`;

function ComputeDetailsView() {
  return (
    <ComputeDetailsRoot>
      <ComputeDetailsTitle>
        <h2>Compute</h2>
      </ComputeDetailsTitle>
      <StyledTabs>
        <TabList>
          <Tab>Config</Tab>
          <Tab>Code</Tab>
          <Tab>Environment</Tab>
        </TabList>

        <StyledTabPanel>
          <p>Hello, world!</p>
        </StyledTabPanel>
        <StyledTabPanel>
          <p>Hello, world!</p>
        </StyledTabPanel>
        <StyledTabPanel>
          <p>Hello, world!</p>
        </StyledTabPanel>
      </StyledTabs>
    </ComputeDetailsRoot>
  );
}

export default ComputeDetailsView;
