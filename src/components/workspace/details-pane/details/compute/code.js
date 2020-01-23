import React, { useEffect, useRef } from 'react';
import styled, { withTheme } from 'styled-components';
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

function setMonacoLanguageForRuntime(runtime) {
  const language = detectLanguageFromRuntime(runtime);
  monaco.editor.setModelLanguage(document.editor.monaco.getModel(), language);
}

export function ComputeCodeDetailsPanel({ theme, autosaveDelayMs = 1000 }) {
  const {
    state: { selected },
    actions: { updateResourceConfiguration }
  } = useWorkspaceContext();

  // Initialize our global instance of the Monaco editor. Only change it if the theme mode changes.
  //
  const mode = theme.mode;
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
        id: null,
        el,
        monaco: editor
      };
    }

    let monacoTheme = 'vs-light';
    if (mode === 'dark') {
      monacoTheme = 'vs-dark';
    }
    monaco.editor.setTheme(monacoTheme);

    function resize() {
      document.editor.monaco.layout();
    }
    document.addEventListener('split-resize', resize);
    return function() {
      document.removeEventListener('split-resize', resize);
    };
  }, [mode]);

  // Create an effect that will update the context handler for updating resource configuration every time the state
  // changes. Note that state does not change when a user is typing text into the editor itself (reducing renders).
  // We do, however, set a timeout on every keystroke so that the editor will autosave after the user has stopped typing
  // for a certain amount of time.
  const saveActionRegistrationRef = useRef(null);
  const onKeyupListenerRef = useRef(null);
  const timeoutSaveRef = useRef(null);
  const didSaveAfterTimeoutRef = useRef(false);
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
    onKeyupListenerRef.current = document.editor.monaco.onKeyUp(function() {
      if (timeoutSaveRef.current !== null) {
        clearTimeout(timeoutSaveRef.current);
      }
      timeoutSaveRef.current = setTimeout(function() {
        updateResourceConfiguration(document.editor.id, { code: document.editor.monaco.getValue() });
        timeoutSaveRef.current = null;
        didSaveAfterTimeoutRef.current = true;
      }, autosaveDelayMs);
    });

    return function() {
      saveActionRegistrationRef.current.dispose();
      onKeyupListenerRef.current.dispose();
      if (timeoutSaveRef.current !== null) {
        clearTimeout(timeoutSaveRef.current);
      }
    };
  }, [saveActionRegistrationRef, onKeyupListenerRef, timeoutSaveRef, autosaveDelayMs, updateResourceConfiguration]);

  // This effect simply saves what is in the editor into the context state when the component unmounts.
  //
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

  // This effect sets the value and language of the editor when a new resource is selected. It also catches the edge
  // case where after an autosave we ignore any potential side-effects in the editor.
  //
  const ref = useRef(null);
  useEffect(() => {
    if (selected.meta.id !== document.editor.id) {
      // A new resource has been selected but the editor is still in view. We need to update the editor with the
      // new code
      document.editor.monaco.setValue(selected.config.code || '');
      setMonacoLanguageForRuntime(selected.config.runtime);
      document.editor.id = selected.meta.id;
    } else if (didSaveAfterTimeoutRef.current) {
      // This effect is being triggered after an automatic save of the updated code after the timeout. Nothing else
      // would have changed, so we don't need to do anything else.
      didSaveAfterTimeoutRef.current = false;
    } else {
      // Other state may have been updated. We still need to show those changes
    }
  }, [selected]);

  // If the runtime changes, then we need to update the intellisense
  //
  const { runtime } = selected.config;
  useEffect(() => {
    setMonacoLanguageForRuntime(runtime);
    const language = detectLanguageFromRuntime(runtime);
    if (document.editor.monaco.getValue() === '') {
      const template = templates[language];
      if (template) {
        document.editor.monaco.setValue(template);
      }
    }
  }, [runtime]);

  // This effect attaches the editor to the DOM
  //
  useEffect(() => {
    ref.current.appendChild(document.editor.el);
    document.editor.monaco.layout();
    document.editor.monaco.focus();
  }, [ref]);

  return (
    <CodeDetailsRoot>
      <Editor ref={ref}></Editor>
    </CodeDetailsRoot>
  );
}

export default withTheme(ComputeCodeDetailsPanel);
