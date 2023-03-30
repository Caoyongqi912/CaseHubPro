import React, { FC } from 'react';
import { Button, message } from 'antd';
import { runInterfaceGroup } from '@/api/interface';

interface SelfProps {
  selectedKeys: string[];
}

const RunGroup: FC<SelfProps> = (props) => {
  const { selectedKeys } = props;

  const run = async () => {
    let reqbody = {
      interfaceIDs: selectedKeys,
    };
    const { code, data, msg } = await runInterfaceGroup(reqbody);
    if (code === 0) {
      message.success(msg);
    }
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
