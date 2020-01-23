import styled from 'styled-components';

export const TextInput = styled.input.attrs(({ name, value, onChange, onKeyDown }) => ({
  type: 'text',
  name,
  value,
  onChange,
  onKeyDown,
  readOnly: onChange === undefined || onChange === null,
  spellCheck: false,
  autoComplete: 'off'
}))`
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  color: ${({ theme }) => theme.colors.fonts.main};
  width: ${({ readOnly }) => (readOnly ? '98%' : 'auto')};
  border: 2px solid
    ${({ theme, isValid, borderless, readOnly }) => {
      if (readOnly) {
        return 'transparent';
      }
      if (isValid === false) {
        return theme.colors.alerts.warning;
      }
      if (borderless === true) {
        return 'transparent';
      }
      return theme.colors.backgrounds.light;
    }};
  padding: 3px;
  border-radius: 3px;

  &:hover {
    border: 2px solid
      ${({ theme, isValid, readOnly }) => {
        if (readOnly) return 'transparent';
        if (isValid === false) return theme.colors.alerts.warning;
        return theme.colors.backgrounds.light;
      }};
  }

  &:focus {
    box-shadow: 0px 0px 2px
      ${({ theme, isValid, readOnly }) => {
        if (readOnly) return 'transparent';
        if (isValid === false) return theme.colors.alerts.warning;
        return theme.colors.primary.light;
      }};
    border: 2px solid
      ${({ theme, isValid, readOnly }) => {
        if (readOnly) return 'transparent';
        if (isValid === false) return theme.colors.alerts.warning;
        return theme.colors.primary.light;
      }} !important;
    outline: none;
  }

  ${({ readOnly }) =>
    readOnly
      ? `
    border: none !important; 
    &:focus { 
      outline: none !important; 
    }`
      : ''}
`;
