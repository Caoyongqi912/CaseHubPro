import React, { FC, useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { Card, Table } from 'antd';
import columns from '@/pages/Case/CaseAPI/component/Result/verifyInfo/tableColums';
import { ResponseAPI } from '@/api';

interface SelfProps {
  response: any;
  verifyInfo: ResponseAPI.IVerify[];
}

const VerifyTable: FC<SelfProps> = (props) => {
  const { response, verifyInfo } = props;
  const [verifyData, setVerifyData] = useState<ResponseAPI.IVerify[]>([]);

  useEffect(() => {
    setVerifyData(verifyInfo);
  }, [verifyInfo]);

  return (
    <>
      <Card style={{ width: '100%' }}>
        <CodeEditor height={'10vh'} read={true} value={response} />
      </Card>
      <Card style={{ width: '100%', marginTop: 2 }}>
        <Table columns={columns} dataSource={verifyData} />
      </Card>
    </>
  );
};

export default VerifyTable;
