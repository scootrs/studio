import React from 'react';
import styled from 'styled-components';

import { ValidatedTextInput } from 'shared/styles/input/text-validated';

const ApplicationNameInput = styled(ValidatedTextInput)`
  input {
    font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  }
`;

function ApplicationNameView({ value, onChangeEnd, caption, isValid }) {
  return (
    <ApplicationNameInput
      id="applicationName"
      name="name"
      value={value}
      placeholder="ApplicationName"
      onChangeEnd={onChangeEnd}
      seedCaption={caption}
      seedIsValid={isValid}
      borderless={true}
    />
  );
}

export default ApplicationNameView;
