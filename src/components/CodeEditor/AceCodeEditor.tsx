import React, { FC, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/mode-json';

// 将 Python 字典序列化为 JSON 格式
const serializePythonDict = (dict: any): string => {
  if (typeof dict !== 'object' || dict === null || Array.isArray(dict)) {
    throw new Error('传入的不是 Python 字典类型');
  }
  return JSON.stringify(dict, null, 2);
};

interface selfProps {
  value?: any;
  readonly?: boolean;
  height?: string;
  onChange?: (value: string) => void;
}

const AceCodeEditor: FC<selfProps> = (props) => {
  const { value, readonly, height = '30vh', onChange } = props;
  const [mode, setMode] = useState('json');

  return (
    <AceEditor
      theme="twilight"
      mode={mode}
      readOnly={readonly || false}
      height={height || '100%'}
      width={'100%'}
      value={value}
      fontSize={14}
      onChange={onChange}
      showGutter
      showPrintMargin={false}
      wrapEnabled
      highlightActiveLine
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 4,
        readOnly: readonly || false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        // useWorker: useWorker === undefined ? useWorker: true,
        useWorker: true,
      }}
    />
  );
};

export default AceCodeEditor;
