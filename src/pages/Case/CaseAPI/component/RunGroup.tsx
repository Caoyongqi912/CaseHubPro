import React, { FC } from 'react';
import { Button, message } from 'antd';
import { runInterfaceGroup } from '@/api/interface';
import { history } from 'umi';

interface SelfProps {
  selectedKeys: string[];
}

const RunGroup: FC<SelfProps> = (props) => {
  const { selectedKeys } = props;

  const run = async () => {
    const { code, data, msg } = await runInterfaceGroup({
      interfaceIDs: selectedKeys,
    });
    if (code === 0) {
      message.success(msg);
      history.push('/report/history');
    }
  };

  return (
    <>
      {selectedKeys.length > 0 && (
        <Button type={'primary'} onClick={run}>
          批量运行
        </Button>
      )}
    </>
  );
};

export default RunGroup;
