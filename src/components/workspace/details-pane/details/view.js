import React from 'react';
import styled from 'styled-components';
import { FlexTabs, FlexTabPanel } from '~styles/tabs';

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

const HeaderTitle = styled.input.attrs(({ name, value, onChange }) => ({ type: 'text', name, value, onChange }))`
  font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  padding: 3px;
  border: 1px solid transparent;
  padding: 3px;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

  &:focus {
    outline: none;
  }
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
  padding: ${({ theme }) => theme.spacing.small};
`;

const InputTable = styled.table``;

const InputTableBody = styled.tbody``;

const InputRow = styled.tr`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const InputLabelCol = styled.td`
  white-space: pre;
`;
const InputCol = styled.td`
  width: 100%;
`;

const InputLabel = styled.label.attrs(({ htmlFor }) => ({
  htmlFor
}))`
  padding-bottom: 2px;
`;

const TextInput = styled.input.attrs(({ name, value, onChange }) => ({
  type: 'text',
  name,
  value,
  onChange,
  readOnly: onChange === undefined || onChange === null
}))`
  padding: 2px;
  width: 60%;
  ${({ readOnly }) => (readOnly ? 'border: none;' : '')}
`;

const Select = styled.select.attrs(({ name, value, onChange }) => ({
  name,
  value,
  onChange
}))``;

const Option = styled.option.attrs(({ value }) => ({
  value
}))``;

function Input({ type, label, name, value, onChange, options }) {
  switch (type) {
    case 'text':
      return (
        <InputRow>
          <InputLabelCol>
            <InputLabel htmlFor={name}>{label}</InputLabel>
          </InputLabelCol>
          <InputCol>
            <TextInput name={name} value={value} onChange={onChange} />
          </InputCol>
        </InputRow>
      );

    case 'select':
      return (
        <InputRow>
          <InputLabelCol>
            <InputLabel htmlFor={name}>{label}</InputLabel>
          </InputLabelCol>
          <InputCol>
            <Select name={name} value={value} onChange={onChange}>
              {options.map(option => (
                <Option key={option.name} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </InputCol>
        </InputRow>
      );

    default:
      console.warn('Got unsupported detail input type: ' + type);
  }
}

export default function DetailsView({ details, onRootKeyPress }) {
  return (
    <DetailsViewRoot onKeyPress={onRootKeyPress}>
      <DetailsViewHeader>
        <HeaderIcon type={details.type} />
        <HeaderTitle name={details.title.name} value={details.title.value} onChange={details.title.onChange} />
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
                                  <Input
                                    key={input.name}
                                    type={input.type}
                                    label={input.label}
                                    name={input.name}
                                    value={input.value}
                                    onChange={input.onChange}
                                    options={input.options}
                                  />
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
