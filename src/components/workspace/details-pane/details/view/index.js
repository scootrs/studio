import React from 'react';
import styled from 'styled-components';
import { FlexTabs, FlexTabPanel } from '~styles/tabs';
import { HeaderTitleContainer, HeaderTitleInput, HeaderIcon, HeaderRightContent } from './header';
import { DetailsViewHeader, DetailsViewBody, DetailsSection, DetailsSectionTitle, DetailsSectionBody } from './body';
import { TabularInput } from '~styles/input/tabular';
import { InputLabel } from '~styles/input/label';
import { ValidatedTextInput } from '~styles/input/text-validated';
import { SelectInput } from '~styles/input/select';
import { TextInput } from '~styles/input/text';
import { InputTable, InputTableBody, InputRow, InputLabelCol, InputCol } from './input-table';

const DetailsViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

function renderInput(input) {
  switch (input.type) {
    case 'validated-text':
      return <ValidatedTextInput key={input.name} {...input} />;

    case 'text':
      return <TextInput key={input.name} {...input} />;

    case 'select':
      return <SelectInput key={input.name} {...input} />;

    case 'tabular':
      return <TabularInput key={input.name} {...input} />;

    default:
      return <></>;
  }
}

export default function DetailsView({ details, onRootKeyPress }) {
  return (
    <DetailsViewRoot onKeyPress={onRootKeyPress}>
      <DetailsViewHeader>
        <HeaderIcon type={details.header.type} />
        <HeaderTitleContainer>
          <HeaderTitleInput borderless={true} {...details.header.title} />
        </HeaderTitleContainer>
        <HeaderRightContent>{details.header.inputs.map(renderInput)}</HeaderRightContent>
      </DetailsViewHeader>
      <DetailsViewBody>
        <FlexTabs>
          {details.tabs.map(tab => {
            if (tab.component) {
              // We have a custom component provided by the developer that we need to render.
              if (tab.sections) {
                console.warn(
                  `You have specified both a React component and a list of sections to render in the ${tab.title}` +
                    ' tab. React will render the specified component, but make sure you only use one or ' +
                    'the other'
                );
              }
              return (
                <FlexTabPanel key={tab.title} name={tab.title}>
                  {tab.component}
                </FlexTabPanel>
              );
            } else {
              if (!tab.sections) {
                // No component was provided and no sections were provided. Warn the developer.
                console.warn(`You have not specified 'component' or 'sections' for the tab ${tab.title}`);
              } else {
                // We need to render the sections according to the details the user has given us
                return (
                  <FlexTabPanel key={tab.title} name={tab.title}>
                    {tab.sections.map(section => {
                      return (
                        <DetailsSection key={section.title}>
                          <DetailsSectionTitle>{section.title}</DetailsSectionTitle>
                          <DetailsSectionBody>
                            <InputTable>
                              <InputTableBody>
                                {section.inputs.map(input => (
                                  <InputRow key={input.name}>
                                    <InputLabelCol>
                                      <InputLabel htmlFor={input.name}>{input.label}</InputLabel>
                                    </InputLabelCol>
                                    <InputCol>{renderInput(input)}</InputCol>
                                  </InputRow>
                                ))}
                              </InputTableBody>
                            </InputTable>
                          </DetailsSectionBody>
                        </DetailsSection>
                      );
                    })}
                  </FlexTabPanel>
                );
              }
            }
          })}
        </FlexTabs>
      </DetailsViewBody>
    </DetailsViewRoot>
  );
}
