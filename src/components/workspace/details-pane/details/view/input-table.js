import styled from 'styled-components';

export const InputTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0px;
`;

export const InputTableBody = styled.tbody``;

export const InputRow = styled.tr`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgrounds.light};
`;

export const InputLabelCol = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px;
  min-width: 150px;
  max-width: 150px;
  width: 150px;
`;
export const InputCol = styled.td`
  width: 100%;
  padding: 3px 8px;
  border-left: 1px solid ${({ theme }) => theme.colors.backgrounds.light}
`;
