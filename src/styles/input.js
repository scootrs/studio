import React from 'react';
import styled from 'styled-components';

export const TextInput = styled(({ id, name, value, onChange }) => {
  return <input type="text" id={id} name={name} value={value} onChange={onChange} />;
})`
  
`;
