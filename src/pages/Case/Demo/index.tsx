import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import type { Socket } from 'socket.io-client';
import { Button, message } from 'antd';
import { startGetLog, stopGetLog } from '@/api/case';
import io from 'socket.io-client';

const Index = () => {
  const [roomID, setRoomID] = useState<string>();
  const [log, setLogData] = useState<string[]>([]);
  const [allLogs, setAllLogs] = useState<string[]>([]); // 新增一个状态变量 allLogs 来保存所有的日志内容

  useEffect(() => {
    setAllLogs((prevLogs) => [...prevLogs, ...log]); // 在变化时将 log 合并到 allLogs 中
  }, [log]);
  useEffect(() => {
    if (roomID) {
      const socket = io('http://127.0.0.1:5000/', { query: { room: roomID } });

      socket.on('connect', function () {
        console.log(`Connected to room ${roomID}`);
      });

      socket.on('log', ({ code, msg }) => {
        console.log(msg);
        if (code === 1) {
          setLogData([...log, msg]);
        } else {
          socket.disconnect();
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [roomID]);

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
