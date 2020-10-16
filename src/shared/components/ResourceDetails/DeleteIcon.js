import React from 'react';
import styled from 'styled-components';
import TrashAltSolidSvg from './trash-alt-solid.svg';

const ViewRoot = styled.div`
  margin: 0px 5px 0px 15px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const DeleteIconSvg = styled(TrashAltSolidSvg)`
  width: 15px;
  height: 15px;
  pointer-events: none;
  path {
    fill: ${({ theme }) => theme.colors.fonts.main};
  }
`;

function DeleteIcon({ onClick }) {
  return (
    <ViewRoot onClick={onClick}>
      <DeleteIconSvg />
    </ViewRoot>
  );
}

export default DeleteIcon;
