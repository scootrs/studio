import styled from 'styled-components';

export const InputLabel = styled.label.attrs(({ htmlFor }) => ({
  htmlFor
}))`
  padding-bottom: 2px;
`;
