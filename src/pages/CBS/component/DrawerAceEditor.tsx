import React, { FC } from 'react';
import { Drawer } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';

interface SelfProps {
  visible: boolean;
  onClose: any;
  allLogs: string;
}

const DrawerAceEditor: FC<SelfProps> = (props) => {
  const { visible, onClose, allLogs } = props;
  return (
    <Drawer
      title={'构造日志'}
      width={'70%'}
      maskClosable={false}
      open={visible}
      onClose={onClose}
      placement={'right'}
    >
      <AceEditor
        mode="json"
        theme="twilight"
        name="my-editor"
        value={allLogs}
        height="100%"
        width="100%"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        readOnly={true}
      />
    </Drawer>
  );
};

export default DrawerAceEditor;
