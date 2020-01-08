import styled, { keyframes, css } from 'styled-components';

const spinnerKeyframes = keyframes`
  100% {
    box-shadow: 
      2em 0em 0 0em, 
      1.41421356em 1.41421356em 0 -0.4375em, 
      0em 2em 0 -0.375em, 
      -1.41421356em 1.41421356em 0 -0.3125em, 
      -2em 0em 0 -0.25em, 
      -1.41421356em -1.41421356em 0 -0.1875em, 
      0em -2em 0 -0.125em, 
      1.41421356em -1.41421356em 0 -0.0625em;
  }
  87.5% {
    box-shadow: 
      2em 0em 0 -0.4375em, 
      1.41421356em 1.41421356em 0 -0.375em, 
      0em 2em 0 -0.3125em, 
      -1.41421356em 1.41421356em 0 -0.25em, 
      -2em 0em 0 -0.1875em, 
      -1.41421356em -1.41421356em 0 -0.125em, 
      0em -2em 0 -0.0625em, 
      1.41421356em -1.41421356em 0 0em;
  }
  75% {
    box-shadow: 
      2em 0em 0 -0.375em, 
      1.41421356em 1.41421356em 0 -0.3125em, 
      0em 2em 0 -0.25em, 
      -1.41421356em 1.41421356em 0 -0.1875em, 
      -2em 0em 0 -0.125em, 
      -1.41421356em -1.41421356em 0 -0.0625em, 
      0em -2em 0 0em, 
      1.41421356em -1.41421356em 0 -0.4375em;
  }
  62.5% {
    box-shadow: 
      2em 0em 0 -0.3125em, 
      1.41421356em 1.41421356em 0 -0.25em, 
      0em 2em 0 -0.1875em, 
      -1.41421356em 1.41421356em 0 -0.125em, 
      -2em 0em 0 -0.0625em, 
      -1.41421356em -1.41421356em 0 0em, 
      0em -2em 0 -0.4375em, 
      1.41421356em -1.41421356em 0 -0.375em;
  }
  50% {
    box-shadow: 2em 0em 0 -0.25em, 
    1.41421356em 1.41421356em 0 -0.1875em, 
    0em 2em 0 -0.125em, 
    -1.41421356em 1.41421356em 0 -0.0625em, 
    -2em 0em 0 0em, 
    -1.41421356em -1.41421356em 0 -0.4375em, 
    0em -2em 0 -0.375em, 
    1.41421356em -1.41421356em 0 -0.3125em;
  }
  37.5% {
    box-shadow: 2em 0em 0 -0.1875em, 
    1.41421356em 1.41421356em 0 -0.125em, 
    0em 2em 0 -0.0625em, 
    -1.41421356em 1.41421356em 0 0em, 
    -2em 0em 0 -0.4375em, 
    -1.41421356em -1.41421356em 0 -0.375em, 
    0em -2em 0 -0.3125em, 
    1.41421356em -1.41421356em 0 -0.25em;
  }
  25% {
    box-shadow: 
      2em 0em 0 -0.125em, 
      1.41421356em 1.41421356em 0 -0.0625em, 
      0em 2em 0 0em, 
      -1.41421356em 1.41421356em 0 -0.4375em, 
      -2em 0em 0 -0.375em, 
      -1.41421356em -1.41421356em 0 -0.3125em, 
      0em -2em 0 -0.25em, 
      1.41421356em -1.41421356em 0 -0.1875em;
  }
  12.5% {
    box-shadow: 
      2em 0em 0 -0.0625em, 
      1.41421356em 1.41421356em 0 0em, 
      0em 2em 0 -0.4375em, 
      -1.41421356em 1.41421356em 0 -0.375em, 
      -2em 0em 0 -0.3125em, 
      -1.41421356em -1.41421356em 0 -0.25em, 
      0em -2em 0 -0.1875em, 
      1.41421356em -1.41421356em 0 -0.125em;
  }
  0% {
    box-shadow: 
      2em 0em 0 0em, 
      1.41421356em 1.41421356em 0 -0.4375em, 
      0em 2em 0 -0.375em, 
      -1.41421356em 1.41421356em 0 -0.3125em, 
      -2em 0em 0 -0.25em, 
      -1.41421356em -1.41421356em 0 -0.1875em, 
      0em -2em 0 -0.125em, 
      1.41421356em -1.41421356em 0 -0.0625em;
  }
`;

const animation = () => css`
  1.5s linear 150ms normal infinite forwards running ${spinnerKeyframes};
`;

const Spinner = styled.span`
  display: inline-block;
  height: 1em;
  width: 1em;
  line-height: 1;
  vertical-align: middle;
  border-radius: 1em;
  transition: all 150ms linear 0s;
  transform: scale(0);
  opacity: 0;
  box-shadow: 2em 0em 0 0em, 1.41421356em 1.41421356em 0 -0.4375em, 0em 2em 0 -0.375em,
    -1.41421356em 1.41421356em 0 -0.3125em, -2em 0em 0 -0.25em, -1.41421356em -1.41421356em 0 -0.1875em,
    0em -2em 0 -0.125em, 1.41421356em -1.41421356em 0 -0.0625em;
  transform: scale(0.25);
  opacity: 1;
  animation: ${animation};
  margin: 0em 0.7em 0em 0.4em;
`;

export default Spinner;
