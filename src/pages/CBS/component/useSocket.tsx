import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [roomID, setRoomID] = useState<string | null>(null);
  const [log, setLogData] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [allLogs, setAllLogs] = useState<string[]>([]); // 新增一个状态变量 allLogs 来保存所有的日志内容

  useEffect(() => {
    setAllLogs((prevLogs) => [...prevLogs, ...log]); // 在变化时将 log 合并到 allLogs 中
  }, [log]);

  useEffect(() => {
    if (roomID) {
      socketRef.current = io('http://10.1.1.90:8080/', {
        query: { room: roomID },
      });
      const socket = socketRef.current;
      socket.on('connect', function () {
        console.log(`Connected to room ${roomID}`);
      });
      socket.on('log', ({ code, msg }) => {
        if (code === 0) {
          setLogData([...log, msg]);
        } else {
          socket.on('disconnect', () => {
            console.log(`disconnect to room ${roomID}`);
          });
          setRoomID(null);
          socket.disconnect();
        }
      });

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [roomID]);
  return {
    setRoomID,
    setLogData,
    drawer,
    setDrawer,
    allLogs,
    setAllLogs,
  };
};

export default useSocket;
