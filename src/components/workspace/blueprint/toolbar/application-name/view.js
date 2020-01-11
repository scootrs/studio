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
