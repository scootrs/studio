import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input.attrs(({ name, value, onChange }) => ({
  type: 'text',
  name,
  value,
  onChange,
  readOnly: onChange === undefined || onChange === null
}))`
  padding: 2px;
  width: 98%;
  ${({ readOnly }) =>
    readOnly
      ? `
    border: none; 
    &:focus { 
      outline: none; 
    }`
      : ''}
`;

const Select = styled.select.attrs(({ name, value, onChange }) => ({
  name,
  value,
  onChange
}))``;

const Option = styled.option.attrs(({ value }) => ({
  value
}))``;

export const InputLabel = styled.label.attrs(({ htmlFor }) => ({
  htmlFor
}))`
  padding-bottom: 2px;
`;

export function Input({ id, type, name, value, onChange, onKeyDown, placeholder, options }) {
  switch (type) {
    case 'text':
      return (
        <TextInput
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      );

    case 'select':
      return (
        <Select id={id} name={name} value={value} onChange={onChange}>
          {options.map(option => (
            <Option key={option.name} value={option.value}>
              {option.name}
            </Option>
          ))}
        </Select>
      );

    default:
      console.warn('Got unsupported detail input type: ' + type);
      return <></>;
  }
}
