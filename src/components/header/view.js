import React from 'react';
import styled from 'styled-components';
import Logo from './logo-white.svg';

const Header = styled.header`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
  background-image: linear-gradient(
    to top right,
    ${({ theme }) => theme.colors.primary.dark},
    ${({ theme }) => theme.colors.primary.main}
  );
  color: ${({ theme }) => theme.colors.fonts.inverse};
  padding: 0px 10px;
`;

const logoWidth = 100;

const StyledLogo = styled(Logo)`
  width: ${logoWidth}px;
  height: ${Math.floor(logoWidth * 0.244)}px;
  margin: 10px 0px;
`;

function HeaderView() {
  return (
    <Header>
      <StyledLogo />
    </Header>
  );
}

export default HeaderView;
