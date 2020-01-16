import React from 'react';
import styled from 'styled-components';
import { FlexTabs, FlexTabPanel } from '~styles/tabs';
import TabularInput from './tabular-input';
import { Input, InputLabel } from './input';
import { InputTable, InputTableBody, InputRow, InputLabelCol, InputCol } from './input-table';

const DetailsViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const DetailsViewHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const HeaderIcon = styled.div``;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const HeaderTitle = styled.input.attrs(({ name, value, onChange }) => ({ type: 'text', name, value, onChange }))`
  font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  border: 2px solid ${({ error }) => (error ? 'red' : 'transparent')};
  padding: 3px;
  border-radius: 3px;

  &:hover {
    border: 2px solid ${({ theme, error }) => (error ? 'red' : theme.colors.backgrounds.light)};
  }

  &:focus {
    box-shadow: 0px 0px 2px ${({ theme, error }) => (error ? 'red' : theme.colors.primary.main)};
    border: 2px solid ${({ theme, error }) => (error ? 'red' : theme.colors.primary.main)} !important;
    outline: none;
  }
`;

const HeaderTitleCaption = styled.span`
  font-size: 0.7em;
  height: 0.7em;
  margin-top: 2px;
  color: ${({ error }) => (error ? 'red' : 'inherit')};
`;

const HeaderRightContent = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const DetailsViewBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;
const DetailsSectionTitle = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
  background-color: ${({ theme }) => theme.colors.backgrounds.light};
`;

const DetailsSectionBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DetailsView({ details, onRootKeyPress }) {
  return (
    <DetailsViewRoot onKeyPress={onRootKeyPress}>
      <DetailsViewHeader>
        <HeaderIcon type={details.header.type} />
        <HeaderTitleContainer>
          <HeaderTitle
            name={details.header.title.name}
            error={details.header.title.error}
            value={details.header.title.value}
            onChange={details.header.title.onChange}
            placeholder={details.header.title.placeholder}
          />
          <HeaderTitleCaption error={details.header.title.error}>{details.header.title.caption}</HeaderTitleCaption>
        </HeaderTitleContainer>
        <HeaderRightContent>
          {details.header.inputs.map(input => (
            <Input
              key={input.name}
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              options={input.options}
            />
          ))}
        </HeaderRightContent>
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
                                    <InputCol>
                                      {input.type === 'tabular' ? (
                                        <TabularInput
                                          columns={input.columns}
                                          rows={input.rows}
                                          onAddRow={input.onAddRow}
                                          onRemoveRow={input.onRemoveRow}
                                          onUpdateRow={input.onUpdateRow}
                                        />
                                      ) : (
                                        <Input
                                          type={input.type}
                                          name={input.name}
                                          value={input.value}
                                          onChange={input.onChange}
                                          options={input.options}
                                        />
                                      )}
                                    </InputCol>
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
