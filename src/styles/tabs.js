import React, { useState } from 'react';
import styled from 'styled-components';

export const FlexTabPanel = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-grow: 1;
`;

const FlexTabTitleList = styled.div`
  display: block;
  border-bottom: 2px solid ${({ theme }) => theme.colors.backgrounds.main};
`;

const FlexTabTitle = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 10px;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.backgrounds.light : 'inherit')};
`;

const FlexTabPanelContainer = styled.div`
  flex-grow: 1;
  display: flex;
`;

export const FlexTabs = styled(({ tabsFor, children }) => {
  let childrenArray = React.Children.toArray(children);
  const [state, setState] = useState({
    selected: childrenArray.length ? childrenArray[0].props.name : null,
    tabsFor
  });
  if (state.tabsFor !== tabsFor) {
    // We have a new item in view. Reset to defaults.
    setState({
      selected: childrenArray.length ? childrenArray[0].props.name : null,
      tabsFor
    });
  }
  if(state.selected === null && childrenArray.length > 0) {
    // Originally the component was rendered without any tabs. Now there are tabs. Update
    // the state to reflect it
    setState({
      selected: childrenArray[0].props.name,
      tabsFor
    });
  }

  return (
    <>
      <FlexTabTitleList>
        {childrenArray.map(child => (
          <FlexTabTitle
            key={child.props.name}
            selected={state.selected === child.props.name}
            onClick={ev => {
              ev.preventDefault();
              ev.stopPropagation();
              setState(function(prev) {
                return {
                  ...prev,
                  selected: child.props.name
                };
              });
            }}
          >
            {child.props.name}
          </FlexTabTitle>
        ))}
      </FlexTabTitleList>
      <FlexTabPanelContainer>
        {childrenArray.filter(child => child.props.name === state.selected)}
      </FlexTabPanelContainer>
    </>
  );
})`
  display: flex;
  flex-direction: column;
`;
