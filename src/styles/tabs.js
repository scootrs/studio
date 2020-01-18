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

export const FlexTabs = styled(({ children }) => {
  let childrenArray = React.Children.toArray(children);
  const [selected, setSelected] = useState();
  const defaultSelected = !selected ? (childrenArray.length && childrenArray[0].props.name) || null : selected;
  return (
    <>
      <FlexTabTitleList>
        {childrenArray.map(child => (
          <FlexTabTitle
            key={child.props.name}
            selected={defaultSelected === child.props.name}
            onClick={ev => {
              ev.preventDefault();
              ev.stopPropagation();
              setSelected(child.props.name);
            }}
          >
            {child.props.name}
          </FlexTabTitle>
        ))}
      </FlexTabTitleList>
      <FlexTabPanelContainer>{childrenArray.filter(child => child.props.name === defaultSelected)}</FlexTabPanelContainer>
    </>
  );
})`
  display: flex;
  flex-direction: column;
`;
