import styled from 'styled-components';

const Item = styled.div.attrs(props => ({
  style: {
    top: props.y + 'px',
    left: props.x + 'px',
  }
}))`
  position: absolute;
`;

export default Item;
