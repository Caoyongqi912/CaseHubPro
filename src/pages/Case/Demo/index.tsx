import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import { Button, message } from 'antd';
import { startGetLog, stopGetLog } from '@/api/case';
import useSocket from '@/pages/CBS/component/useSocket';

const Index = () => {
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();

  const handleEditorChange = (value: any) => {
    console.log(value);
  };

  const Start = async () => {
    const { code, data } = await startGetLog();
    if (code === 0) {
      setRoomID(data);
    } else {
      message.error('err');
    }
  };
  const handleStopTask = async () => {
    const response = await stopGetLog();
    setAllLogs([]);
    setAllLogs([]);
    setLogData([]);
    setRoomID(null);
    console.log(response);
  };
  return (
    <>
      <Button onClick={Start} type={'primary'}>
        start
      </Button>
      <Button onClick={handleStopTask} type={'primary'}>
        Stop Task
      </Button>

      <AceEditor
        mode="json"
        theme="twilight"
        onChange={handleEditorChange}
        name="my-editor"
        value={allLogs.join('')}
        height="500px"
        width="100%"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
};

export default Index;
