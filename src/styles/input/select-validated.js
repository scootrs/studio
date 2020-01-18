import React from 'react';
import styled from 'styled-components';
import { SelectInput } from './select';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputCaption = styled.span`
  font-size: 0.7em;
  margin-top: 2px;
  visibility: ${({ isValid }) => (isValid === true ? 'hidden' : 'visible')}
  color: ${({ theme, isValid }) => (isValid === false ? theme.colors.alerts.warning : 'inherit')};
`;

export function ValidatedSelectInput({ id, name, value, options, onChange, isValid, caption }) {
  return (
    <InputContainer>
      <SelectInput id={id} name={name} value={value} options={options} onChange={onChange} isValid={isValid} />
      <InputCaption isValid={isValid}>{caption}</InputCaption>
    </InputContainer>
  );
}
