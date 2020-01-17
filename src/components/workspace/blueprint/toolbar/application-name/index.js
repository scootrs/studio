import React from 'react';
import styled from 'styled-components';
import { useApplicationContext } from '~contexts/application';
import { ValidatedTextInput } from '~styles/input/text-validated';

const ApplicationNameInput = styled(ValidatedTextInput)`
  input {
    font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  }
`;

export default function ApplicationName() {
  const {
    state: { name },
    actions: { setName }
  } = useApplicationContext();

  const onChangeEnd = function(val, error) {
    setName(val, error);
  };

  const onValidate = function(val) {
    if (val === '') {
      return 'Application name is required';
    }
    if (!/(^[a-z0-9]+$)/gim.test(val)) {
      return 'Application name must only contain alphanumeric characters';
    }
    return '';
  };

  return (
    <ApplicationNameInput
      id="applicationName"
      name="name"
      value={name.value}
      placeholder="ApplicationName"
      onChangeEnd={onChangeEnd}
      onValidate={onValidate}
      seedCaption={name.error}
      seedIsValid={name.error === ''}
      borderless={true}
    />
  );
}
