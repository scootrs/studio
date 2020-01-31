import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { useWorkspaceContext } from '~contexts/workspace';
import { useMonaco } from '~hooks/monaco';
import templates from '~templates';
import { detectLanguageFromRuntime } from './language';

const CodeDetailsRoot = styled.div`
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 8px;
`;

const Editor = styled.div`
  flex-grow: 1;
  position: relative;
`;

export function ComputeCodeDetailsPanel({ theme }) {
  const workspaceContext = useWorkspaceContext();

  const { selected } = workspaceContext.state;

  const { updateSelectedConfiguration } = workspaceContext.actions;

  const { code } = selected.config;
  const language = detectLanguageFromRuntime(selected.config.runtime);

  if (code === '' && language !== 'text') {
    updateSelectedConfiguration({ code: templates[language] });
  }

  const ref = useMonaco('code', {
    value: code,
    language: language,
    theme: theme.mode === 'light' ? 'vs-light' : 'vs-dark',
    broker: document,
    autosave: {
      enable: true,
      timeout: 800
    },
    actions: {
      onSave: function(val) {
        updateSelectedConfiguration({ code: val });
      }
    }
  });

  return (
    <CodeDetailsRoot>
      <Editor ref={ref}></Editor>
    </CodeDetailsRoot>
  );
}

export default withTheme(ComputeCodeDetailsPanel);
