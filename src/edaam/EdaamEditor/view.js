import React, { forwardRef } from 'react';
import styled from 'styled-components';

import ResourceBar from './ResourceBar';

const EditorRoot = styled.div`
  flex-grow: 1;
  min-height: min-content;
  display: flex;
`;

const EditorCanvas = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex-grow: 1;
  background-size: 10px 10px;
  background-image: linear-gradient(
      to right,
      ${({ theme }) => (theme.mode === 'light' ? theme.colors.backgrounds.light : theme.colors.backgrounds.medium)} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => (theme.mode === 'light' ? theme.colors.backgrounds.light : theme.colors.backgrounds.medium)} 1px,
      transparent 1px
    );
`;

function EdaamEditorView({ children, onClick, onContextMenu }, ref) {
  return (
    <EditorRoot onContextMenu={onContextMenu}>
      <ResourceBar />
      <EditorCanvas ref={ref} onClick={onClick}>
        {children}
      </EditorCanvas>
    </EditorRoot>
  );
}

export default forwardRef(EdaamEditorView);
