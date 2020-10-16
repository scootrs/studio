import React from 'react';
import styled from 'styled-components';
import { SelectInput } from './select';

const InputContainer = styled.div`
`;

const InputCaption = styled.span`
  display: block;
  font-size: 0.7em;
  margin-top: 2px;
  visibility: ${({ isValid }) => (isValid === true ? 'hidden' : 'visible')}
  color: ${({ theme, isValid }) => (isValid === false ? theme.colors.alerts.warning : 'inherit')};
`;

export function ValidatedSelectInput({ id, name, value, options, error, onChange }) {
  return (
    <InputContainer>
      <SelectInput id={id} name={name} value={value || ''} options={options} onChange={onChange} isValid={!error} />
      <InputCaption isValid={!error}>{error}</InputCaption>
    </InputContainer>
  );
}
