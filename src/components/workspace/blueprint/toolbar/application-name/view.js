import React from 'react';
import styled from 'styled-components';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input.attrs(({ name, value, onChange }) => ({
  type: 'text',
  name,
  value,
  onChange
}))`
  font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  border: 1px solid ${({ error }) => (error ? 'red' : 'transparent')};
  padding: 3px;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 2px ${({ theme, error }) => (error ? 'red' : theme.colors.primary.main)};
    border: 1px solid ${({ theme, error }) => (error ? 'red' : theme.colors.primary.main)};
  }

  &:focus {
    outline: none;
  }
`;

const Caption = styled.span`
  font-size: 0.7em;
  height: 0.7em;
  margin-top: 2px;
  color: ${({ error }) => (error ? 'red' : 'inherit')};
`;

export default function ApplicationNameView({ value, onChange, error, caption }) {
  return (
    <ViewRoot>
      <TextInput
        name="applicationName"
        value={value}
        placeholder="UnnamedApplication"
        spellcheck={false}
        onChange={onChange}
        error={error}
      />
      <Caption error={error}>{caption}</Caption>
    </ViewRoot>
  );
}
