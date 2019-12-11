import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input.attrs(({ name, value, onChange }) => ({
  type: 'text',
  name,
  value,
  onChange
}))`
  font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  background-color: inherit;
  border: none;

  &:focus {
    background-color: white;
  }
`;

export default function ApplicationNameView({ value, onChange }) {
  return <TextInput name="applicationName" value={value} onChange={onChange} />;
}
