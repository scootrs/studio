import React from 'react';
import styled from 'styled-components';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';;

const DetailsPaneRoot = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: -1px 1px 3px ${({ theme }) => theme.colors.backgrounds.medium};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledTabs = styled(Tabs)`
  height: 100%;
`;

const DetailsPaneTitle = styled.h2`
  padding: 0px 5px;
`;

function DetailsPaneView() {
  return (
    <DetailsPaneRoot>
      <StyledTabs>
        <TabList>
          <Tab>Config</Tab>
          <Tab>Code</Tab>
          <Tab>Environment</Tab>
        </TabList>

        <TabPanel>
          <p>Hello, world!</p>
        </TabPanel>
        <TabPanel>
          <p>Hello, world!</p>
        </TabPanel>
        <TabPanel>
          <p>Hello, world!</p>
        </TabPanel>
      </StyledTabs>
    </DetailsPaneRoot>
  );
}

export default DetailsPaneView;
