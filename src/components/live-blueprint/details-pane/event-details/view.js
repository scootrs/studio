import React from 'react';
import styled from 'styled-components';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const EventDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const EventDetailsTitle = styled.div``;

const StyledTabs = styled(Tabs)`
  height: 100%;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0px 10px;
`;

function EventDetailsView() {
  return (
    <EventDetailsRoot>
      <EventDetailsTitle>
        <h2>Event</h2>
      </EventDetailsTitle>
      <StyledTabs>
        <TabList>
          <Tab>Config</Tab>
        </TabList>
        <StyledTabPanel>
          <p>Hello, world!</p>
        </StyledTabPanel>
      </StyledTabs>
    </EventDetailsRoot>
  );
}

export default EventDetailsView;
