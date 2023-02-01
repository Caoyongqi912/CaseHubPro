import React, { FC } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

const Index: FC<EditorProps> = (props) => {
  return (
    <Editor
      height={props.height || '20vh'}
      options={props.options}
      language={props.language || 'json'}
      theme={props.theme || 'vs-dark'}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default Index;
