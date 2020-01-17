import styled from 'styled-components';

export const DetailsViewHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const DetailsViewBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
`;

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;
export const DetailsSectionTitle = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
  background-color: ${({ theme }) => theme.colors.backgrounds.light};
`;

export const DetailsSectionBody = styled.div`
  display: flex;
  flex-direction: column;
`;