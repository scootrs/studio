import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import useDetailsPaneContext from '../context';

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
    objectId,
    config: { code },
    actions: { setConfig }
  } = useDetailsPaneContext();

  const ref = useRef();
  useEffect(() => {
    if (!document.editor) {
      let el = document.createElement('div');
      el.style.width = '99%';
      el.style.height = '99%';
      el.style.position = 'relative';

      let editor = monaco.editor.create(el, {
        value: code,
        language: 'javascript',
        minimap: {
          enabled: false
        }
      });

      editor.addAction({
        id: 'save',
        label: 'Save',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
        precondition: null,
        keybindingContext: null,
        run: function(ed) {
          setConfig(prev => ({
            ...prev,
            code: ed.getValue()
          }));
        }
      });

      document.editor = {
        id: objectId,
        el,
        monaco: editor
      };
    }

    document.editor.monaco.setValue(code);

    ref.current.appendChild(document.editor.el);
    document.editor.monaco.layout();

    return () => {
      setConfig(prev => {
        return {
          ...prev,
          code: document.editor.monaco.getValue()
        };
      });
    };
  }, [ref, code]);
  return (
    <CodeDetailsRoot>
      <Editor ref={ref}></Editor>
    </CodeDetailsRoot>
  );
}
