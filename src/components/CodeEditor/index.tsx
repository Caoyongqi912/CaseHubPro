import React, { FC } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

interface SelfProps extends EditorProps {
  read?: boolean;
}

const Index: FC<SelfProps> = (props) => {
  const opt = {
    selectOnLineNumbers: true,
    renderSideBySide: false,
    foldingHighlight: true,
    overviewRulerBorder: true,
    tabSize: 2,
    readOnly: props.read || false,
  };

  return (
    <Editor
      height={props.height || '20vh'}
      options={opt}
      language={props.language || 'json'}
      theme={props.theme || 'vs-dark'}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  );
};

export default Index;
