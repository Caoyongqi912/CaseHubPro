import React, { FC, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/mode-json';

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
        useWorker: true,
      }}
    />
  );
};

export default React.memo(AceCodeEditor);
