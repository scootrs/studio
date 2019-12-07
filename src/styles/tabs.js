import React, { useState } from 'react';
import styled from 'styled-components';

export const FlexTabPanel = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-grow: 1;
`;

const FlexTabTitleList = styled.div`
  display: block;
  border-bottom: 1px solid #ccc;
`;

const FlexTabTitle = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid transparent;
  margin-bottom: -2px;
  ${({ selected }) =>
    selected
      ? `
    border: 1px solid #ccc;
    border-bottom: none;
    background-color: white;
  `
      : ''}
`;

const FlexTabPanelContainer = styled.div`
  flex-grow: 1;
  display: flex;
  padding-top: 15px;
`;

export const FlexTabs = styled(({ children }) => {
  let childrenArray = React.Children.toArray(children);
  const [selected, setSelected] = useState((childrenArray.length && childrenArray[0].props.name) || null);
  return (
    <>
      <FlexTabTitleList>
        {childrenArray.map(child => (
          <FlexTabTitle
            key={child.props.name}
            selected={selected === child.props.name}
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
      <FlexTabPanelContainer>{childrenArray.filter(child => child.props.name === selected)}</FlexTabPanelContainer>
    </>
  );
})`
  display: flex;
  flex-direction: column;
`;
