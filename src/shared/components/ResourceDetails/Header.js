import styled from 'styled-components';
import { ValidatedTextInput } from 'shared/styles/input/text-validated';

export const HeaderIcon = styled.div``;

export const HeaderTitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-right: 10px;
`;

export const HeaderTitleInput = styled(ValidatedTextInput)`
  input {
    font-size: ${({ theme }) => theme.fonts.sizes.subtitle};
  }
`;

export const HeaderRightContent = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
