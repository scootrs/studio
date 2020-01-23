import React from 'react';
import styled from 'styled-components';

const Select = styled.select.attrs(({ name, value, onChange }) => ({
  name,
  value,
  onChange
}))`
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fonts.main};
  border: 2px solid
    ${({ theme, isValid }) => {
      if (isValid === false) {
        return theme.colors.alerts.warning;
      }
      return theme.colors.backgrounds.light;
    }};

  &:focus {
    box-shadow: 0px 0px 2px
      ${({ theme, isValid }) => {
        if (isValid === false) return theme.colors.alerts.warning;
        return theme.colors.primary.light;
      }};
    border: 2px solid
      ${({ theme, isValid }) => {
        if (isValid === false) return theme.colors.alerts.warning;
        return theme.colors.primary.light;
      }} !important;
    outline: none;
  }
`;

const Option = styled.option.attrs(({ value }) => ({
  value
}))``;

export function SelectInput({ id, name, value, options, onChange, isValid }) {
  return (
    <Select id={id} name={name} value={value} onChange={onChange} isValid={isValid}>
      {options.map(option => (
        <Option key={option.name} value={option.value}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
}
