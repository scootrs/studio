import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

// We define a single monaco instance to handle all of our code
let _editor = null;

// We also need to define a variable to keep track of the element the editor belongs to. This is a work around the
// inability to reset the editor DOM node after it has been created.
let _el = null;

// We will setup an object to hold all of the editor models (this will allow us to later have tabs or maintain undo
// stacks)
const _models = {};

// We will also setup an object to keep track of all of the view states for each of our models. View states will be
// saved immediately before a new model is loaded as the current model
const _views = {};

// This object defines all of the events that the monoco editor will react to
//
const _events = {
  resize: 'monaco:resize'
};

// These are the default options for the hook
const _options = {
  value: '',
  language: 'text',
  theme: 'vs-light',
  broker: null,
  autosave: {
    enable: false,
    timeout: 1000
  },
  actions: {
    onSave: null
  }
};

export function useMonaco(model = 'default', options = {}) {
  // Merge the provided options with the defaults
  // TODO: make this a deep merge
  options = Object.assign(_options, options);

  console.log(options);

  // Create the reference we will use for attaching our editor to the DOM
  const domElementRef = useRef();

  // Initialize and attach editor to DOM
  //
  useEffect(() => {
    if (_el === null) {
      _el = document.createElement('div');
      _el.style.position = 'relative';
      _el.style.width = '99%';
      _el.style.height = '99%';
    }
    if (_editor === null) {
      // This is the first time the editor has been needed. We should create the editor.
      console.log('Initializing monoco editor');
      _editor = monaco.editor.create(_el, {
        minimap: {
          enabled: false
        }
      });
    }
    // Attach the element to the DOM
    domElementRef.current.append(_el);
    _editor.layout();
  }, [_editor, domElementRef]);

  // Set the theme
  //
  useEffect(() => {
    monaco.editor.setTheme(options.theme);
  }, [options.theme]);

  // Set the model
  //
  // We also keep a reference to the name of the previous model so that we can save the view state when it changes.
  //
  const prevModelNameRef = useRef(model);
  useEffect(() => {
    if (!_models[model]) {
      console.log('Creating a new monaco model: ' + model);
      _models[model] = monaco.editor.createModel();
    }
    _views[prevModelNameRef.current] = _editor.saveViewState();
    _editor.setModel(_models[model]);
    _editor.restoreViewState(_views[model]);
    prevModelNameRef.current = model;
  }, [_editor, _models, model, prevModelNameRef]);

  // Update the current model based on options
  //
  useEffect(() => {
    // Set language
    //
    monaco.editor.setModelLanguage(_models[model], options.language);

    // Set value
    //
    // We only want to set the value if the value is different than what we already see in the editor.
    // We have this check in place because the value provided in the options could have changed after a parent
    // state change, but these state changes are not tracked in the editor (in order to improve performance).
    //
    const currentValueIsTheSame = checkCodeContentEquality(options.value, _models[model].getValue());
    if (!currentValueIsTheSame) {
      _models[model].setValue(options.value);
    }
  }, [_models, model, options.value, options.language]);

  // Setup broker event handlers
  //
  useEffect(() => {
    const broker = options.broker;

    function onResize() {
      _editor.layout();
    }
    broker.addEventListener(_events.resize, onResize);

    return () => {
      broker.removeEventListener(_events.resize, onResize);
    };
  }, [_editor, _events, options.broker]);

  // Register and update actions
  //
  const actions = useRef({
    save: null,
    autosave: {
      timeout: null,
      disposer: null
    }
  });
  useEffect(() => {
    // Register an action for Ctrl + s (saving)
    //
    actions.current.save = _editor.addAction({
      id: 'save',
      label: 'Save',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
      precondition: null,
      keybindingContext: null,
      run: function() {
        if (options.actions.onSave) {
          options.actions.onSave(_editor.getValue());
        }
      }
    });

    // Enable autosave when the user has stopped typing after a certain amount of time
    //
    if (options.autosave.enable) {
      actions.current.autosave.disposer = _editor.onKeyUp(function() {
        if (actions.current.autosave.timeout) {
          clearTimeout(actions.current.autosave.timeout);
        }
        actions.current.autosave.timeout = setTimeout(function() {
          if (options.actions.onSave) {
            options.actions.onSave(_editor.getValue());
          }
        }, options.autosave.timeout);
      });
    }

    return () => {
      // Cleanup the Ctrl + s action
      actions.current.save.dispose();

      // Cleanup the autosave action
      if (options.autosave.enable) {
        actions.current.autosave.disposer.dispose();
        if (actions.current.autosave.timeout) {
          clearTimeout(actions.current.autosave.timeout);
        }
      }
    };
  }, [_editor, actions, options.actions.onSave, options.autosave.enable, options.autosave.timeout]);

  return domElementRef;
}

function checkCodeContentEquality(a, b) {
  const ah = hashCodeContent(a);
  const bh = hashCodeContent(b);
  return ah === bh;
}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashCodeContent(code) {
  let hash = 0;
  let i;
  let chr;
  if (code.length === 0) return hash;
  for (i = 0; i < code.length; i++) {
    chr = code.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
