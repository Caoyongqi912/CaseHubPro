import React, { FC } from 'react';
import MonacoEditor, {
  MonacoEditorProps,
  EditorConstructionOptions,
} from 'react-monaco-editor';

interface SelfProps extends MonacoEditorProps {
  read?: boolean;
}

const Index: FC<SelfProps> = (props) => {
  const opt: EditorConstructionOptions = {
    selectOnLineNumbers: true,
    foldingHighlight: true,
    overviewRulerBorder: false,
    wordWrap: 'on',
    tabSize: 2,
    readOnly: props.read || false,
  };
  const getLanguage = (value: any) => {
    if (value) {
      if (typeof props.value == 'string') {
        if (value.indexOf('<html')) {
          return 'html';
        } else {
          return 'string';
        }
      }
    }
    return 'json';
  };

  return (
    <MonacoEditor
      height={props.height || '20vh'}
      options={opt}
      language="JSON"
      theme={props.theme || 'vs-dark'}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  );
};

export default Index;
