import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { useWorkspaceContext } from '~contexts/workspace';
import templates from '~templates';
import { detectLanguageFromRuntime } from './language';

const CodeDetailsRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  position: relative;
  height: 100%;
`;

const Editor = styled.div`
  flex-grow: 1;
`;

export default function ComputeCodeDetailsPanel() {
  const {
    state: { selected },
    actions: { updateResourceConfiguration }
  } = useWorkspaceContext();

  const { code, runtime } = selected.config;

  // Initialize our global instance of the Monaco editor
  //
  useEffect(() => {
    if (!document.editor) {
      let el = document.createElement('div');
      el.style.width = '99%';
      el.style.height = '99%';
      el.style.position = 'relative';

      let editor = monaco.editor.create(el, {
        minimap: {
          enabled: false
        }
      });

      document.editor = {
        el,
        monaco: editor
      };
    }
    function resize() {
      document.editor.monaco.layout();
    }
    document.addEventListener('split-resize', resize);
    return function() {
      document.removeEventListener('split-resize', resize);
    }
  }, []);

  // Create an effect that will update the context handler for updating resource configuration every time the state
  // changes. Note that state does not change when a user is typing text into the editor itself (reducing renders).
  const saveActionRegistrationRef = useRef();
  useEffect(() => {
    saveActionRegistrationRef.current = document.editor.monaco.addAction({
      id: 'save',
      label: 'Save',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
      precondition: null,
      keybindingContext: null,
      run: function(ed) {
        updateResourceConfiguration(document.editor.id, { code: ed.getValue() });
      }
    });
    return function() {
      saveActionRegistrationRef.current.dispose();
    };
  }, [updateResourceConfiguration]);

  // This effect simply saves what is in the editor into the context state when the component unmounts.
  const updateFunctionRef = useRef();
  updateFunctionRef.current = updateResourceConfiguration;
  useEffect(
    function() {
      return function() {
        updateFunctionRef.current(document.editor.id, { code: document.editor.monaco.getValue() });
        // We have to set the editor ID to null here instead of in the first effect so that we don't try to update
        // with a null ID
        document.editor.id = null;
      };
    },
    [updateFunctionRef]
  );

  // This effect sets the value and langage of the editor when a new resource is selected.
  const ref = useRef();
  useEffect(() => {
    document.editor.id = selected.meta.id;
    let editorCode = code || '';
    if (runtime && runtime !== '') {
      let language = detectLanguageFromRuntime(runtime);
      monaco.editor.setModelLanguage(document.editor.monaco.getModel(), language);
      if (editorCode === '') {
        editorCode = templates[language];
      }
    }
    document.editor.monaco.setValue(editorCode);

    ref.current.appendChild(document.editor.el);
    document.editor.monaco.layout();
  }, [selected, code, runtime]);

  return (
    <CodeDetailsRoot>
      <Editor ref={ref}></Editor>
    </CodeDetailsRoot>
  );
}
