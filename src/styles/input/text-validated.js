import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { TextInput } from './text';

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

export function ValidatedTextInput({
  className,
  id,
  name,
  value,
  placeholder,
  onChangeStart,
  onChangeEnd,
  changeDuration = 500,
  seedIsValid = true,
  seedCaption = '',
  onValidate,
  borderless = false
}) {
  const initialState = {
    value,
    isValid: seedIsValid,
    caption: seedCaption,
    timeout: null
  };

  const [state, setState] = useState(initialState);

  const originalValueRef = useRef(value);
  if (originalValueRef.current !== value) {
    originalValueRef.current = value;
    setState(initialState);
  }

  const hasChanged = useRef(false);

  const onChange = function(ev) {
    const newValue = ev.target.value;
    if (!hasChanged.current) {
      if (onChangeStart) {
        onChangeStart();
      }
      hasChanged.current = true;
    }
    let error = '';
    if (onValidate) {
      error = onValidate(newValue);
    }

    if (state.timeout) {
      clearTimeout(state.timeout);
    }

    setState({
      value: newValue,
      isValid: error === '',
      caption: error,
      timeout: setTimeout(function() {
        onChangeEnd(newValue, error);
        hasChanged.current = false;
        originalValueRef.current = newValue;
      }, changeDuration)
    });
  };

  return (
    <InputContainer className={className}>
      <TextInput
        id={id}
        name={name}
        value={state.value}
        placeholder={placeholder}
        onChange={onChange}
        isValid={state.isValid}
        borderless={borderless}
      />
      <InputCaption isValid={state.isValid}>{state.caption}</InputCaption>
    </InputContainer>
  );
}
