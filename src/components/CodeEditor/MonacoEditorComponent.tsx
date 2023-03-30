import React, { useState, useCallback, useEffect } from 'react';
// @ts-ignore
import MonacoEditor, { EditorDidMount, useMonaco } from '@monaco-editor/react';
import type { languages } from 'monaco-editor';

type Props = {
  defaultValue?: string;
  value?: string;
  language?: keyof typeof languages;
  onChange?: (value: string) => void;
  read?: boolean;
  height?: string;
};

const MonacoEditorComponent: React.FC<Props> = ({
  height,
  defaultValue = '',
  language = 'json',
  onChange,
  read = false,
  value,
}) => {
  const [editorValue, setEditorValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (value !== undefined && value !== editorValue) {
      setEditorValue(value);
    }
  }, [value]);

  const handleEditorDidMount: EditorDidMount = useCallback(
    (editor: any, monacoInstance: any) => {
      // 设置语言类型，并开启自动格式化
      editor.getModel()?.updateOptions({ tabSize: 2 });

      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        setEditorValue(value);
        if (onChange) {
          onChange(value);
        }
      });
    },
    [setEditorValue, onChange],
  );

  return (
    <MonacoEditor
      value={editorValue}
      height={height || '20vh'}
      language={language}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        wordWrap: 'on',
        scrollBeyondLastLine: true,
        automaticLayout: true,
        readOnly: read || false,
      }}
    />
  );
};

export default MonacoEditorComponent;
