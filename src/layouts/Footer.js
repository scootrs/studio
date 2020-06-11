import React from 'react';
import styled from 'styled-components';

import StatusBar from 'status/StatusBar';

const FooterRoot = styled.footer`
  display: flex;
  font-size: 0.8em;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.static.dark.backgrounds.dark};
  flex-shrink: 1;
  color: ${({ theme }) => theme.colors.static.dark.fonts.main};
  font-family: ${({ theme }) => theme.fonts.main};
`;

function Footer() {
  return (
    <FooterRoot>
      <StatusBar />
    </FooterRoot>
  );
}

export default Footer;
