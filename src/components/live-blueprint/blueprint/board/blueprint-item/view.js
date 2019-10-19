import styled from 'styled-components';

const Item = styled.div.attrs(props => ({
  style: {
    top: props.y + 'px',
    left: props.x + 'px',
    backgroundColor: props.theme.colors.primary.main
  }
}))`
  width: 50px;
  height: 50px;
  position: absolute;
`;

export default Item;
