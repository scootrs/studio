import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import { useMonaco } from 'shared/hooks/monaco';

import actions from '../actions';
import templates from './templates';

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

function CodeEditor({ resource, theme }) {
  const dispatch = useDispatch();
  const id = resource.id;

  const code = resource.code;
  const language = detectLanguageFromRuntime(resource.runtime);

  useEffect(() => {
    if (code === '' && language !== 'text') {
      dispatch(actions.update(id, 'code', templates[language]));
    }
  }, [dispatch, id, code, language]);

  const ref = useMonaco('code', {
    value: code,
    language: language,
    theme: theme.mode === 'light' ? 'vs-light' : 'vs-dark',
    broker: document,
    autosave: {
      enable: true,
      timeout: 800,
    },
    actions: {
      onSave: useCallback(
        (val) => {
          dispatch(actions.update(id, 'code', val));
        },
        [dispatch, id]
      ),
    },
  });

  return (
    <CodeDetailsRoot>
      <Editor ref={ref}></Editor>
    </CodeDetailsRoot>
  );
}

export default withTheme(CodeEditor);
