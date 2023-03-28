import React, { FC } from 'react';
import { Button } from 'antd';
import { runInterfaceGroup } from '@/api/interface';

interface SelfProps {
  selectedKeys: string[];
}

const RunGroup: FC<SelfProps> = (props) => {
  const { selectedKeys } = props;

  const run = async () => {
    let reqbody = {
      hostID: null,
      partID: null,
      interfaceIDs: selectedKeys,
    };
    const res = await runInterfaceGroup(reqbody);
    console.log(res.msg);
  };

  return (
    <>
      {selectedKeys.length > 0 ? (
        <Button type={'primary'} onClick={run}>
          批量运行
        </Button>
      ) : null}
    </>
  );
};

export default RunGroup;
