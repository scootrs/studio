import React from 'react';
import styled from 'styled-components';
import { FlexTabPanel, FlexTabs } from '~styles/tabs';

const EventDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const EventDetailsTitle = styled.div``;

function EventDetailsView({ children }) {
  return (
    <EventDetailsRoot>
      <EventDetailsTitle>
        <h2>Event</h2>
      </EventDetailsTitle>
      <FlexTabs>
        {React.Children.toArray(children).map(child => (
          <FlexTabPanel key={child.props.name} name={child.props.name}>
            {child}
          </FlexTabPanel>
        ))}
      </FlexTabs>
    </EventDetailsRoot>
  );
}

export default EventDetailsView;
