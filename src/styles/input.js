import React from 'react';
import styled from 'styled-components';

export const TextInput = styled(({ id, name, value, onChange, label }) => {
  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : ''}
      <input type="text" id={id} name={name} value={value || ''} onChange={onChange} />
    </>
  );
})``;

export const Select = styled(({ id, name, label, value, onChange, children }) => {
  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : ''}
      <select id={id} name={name || id} value={value} onChange={onChange}>
        {children}
      </select>
    </>
  );
})``;

export const Option = styled(({ value, children }) => {
  return <option value={value}>{children}</option>;
})``;

export const Button = styled.button`
  margin: 5px;
`;
