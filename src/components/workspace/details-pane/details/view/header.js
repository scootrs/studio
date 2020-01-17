import styled from 'styled-components';
import { ValidatedTextInput } from '~styles/input/text-validated';

export const HeaderIcon = styled.div``;

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
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
