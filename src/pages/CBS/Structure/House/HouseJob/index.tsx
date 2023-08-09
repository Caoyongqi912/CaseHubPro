import React from 'react';
import useSocket from '@/pages/CBS/component/useSocket';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import Key from '@/pages/CBS/Structure/House/HouseJob/Key';
import Proxy from '@/pages/CBS/Structure/House/HouseJob/Proxy';

const Index = () => {
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();

  return (
    <>
      <DrawerAceEditor
        visible={drawer}
        onClose={() => {
          setDrawer(false);
          setAllLogs([]);
          setLogData([]);
          setRoomID(null);
        }}
        allLogs={allLogs.join('')}
      />
      <Key setDrawer={setDrawer} setRoomID={setRoomID} />
      <Proxy setDrawer={setDrawer} setRoomID={setRoomID} />
    </>
  );
};

export default Index;
