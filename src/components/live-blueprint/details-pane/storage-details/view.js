import React from 'react';
import styled from 'styled-components';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StorageDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StorageDetailsTitle = styled.div``;

const StyledTabs = styled(Tabs)`
  height: 100%;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0px 10px;
`;

function StorageDetailsView() {
  return (
    <StorageDetailsRoot>
      <StorageDetailsTitle>
        <h2>Storage</h2>
      </StorageDetailsTitle>
      <StyledTabs>
        <TabList>
          <Tab>Config</Tab>
        </TabList>
        <StyledTabPanel>
          <p>Hello, world!</p>
        </StyledTabPanel>
      </StyledTabs>
    </StorageDetailsRoot>
  );
}

export default StorageDetailsView;
