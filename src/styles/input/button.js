import styled from 'styled-components';

export const Button = styled.button`
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.backgrounds.light};
  border: 2px solid ${({ theme }) => theme.colors.backgrounds.light};
  border-radius: 3px;
  padding: 3px 5px;

  &:hover {
    background-color: inherit;
    cursor: pointer;
  }
`;
