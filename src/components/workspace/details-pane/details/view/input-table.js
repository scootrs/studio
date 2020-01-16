import styled from 'styled-components';

export const InputTable = styled.table``;

export const InputTableBody = styled.tbody``;

export const InputRow = styled.tr`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgrounds.light};
`;

export const InputLabelCol = styled.td`
  white-space: pre;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3px;
`;
export const InputCol = styled.td`
  width: 100%;
`;
