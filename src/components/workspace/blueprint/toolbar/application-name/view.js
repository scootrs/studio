import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input.attrs(({ name, value, onChange }) => ({
  type: 'text',
  name,
  value,
  onChange
}))`
  font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
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

export default function ApplicationNameView({ value, onChange }) {
  return <TextInput name="applicationName" value={value} onChange={onChange} />;
}
