import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';

const Index = () => {
  const handleEditorChange = (value) => {
    console.log(value);
  };
  return (
    <AceEditor
      mode="json"
      theme="twilight"
      onChange={handleEditorChange}
      name="my-editor"
      value={'{\n  "name": "John Doe",\n  "age": 25\n}'}
      height="500px"
      width="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default Index;
