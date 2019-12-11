import React from 'react';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0% {
    left: 0%;
    width:0%;
  }

  50% {
    left: 0%;
    width: 100%;
  }

  100% {
    left: 100%;
    width: 0%;
  }
`;

const ProgressBarContainer = styled.div`
  position: relative;
  background-color: inherit;
  height: 3px;
`;

const Fill = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main}
  top: 0px;
  animation: ${load} 2s ease-in infinite;
`;

export default function ProgressBarView({ show }) {
  return <ProgressBarContainer>{show ? <Fill /> : ''}</ProgressBarContainer>;
}
