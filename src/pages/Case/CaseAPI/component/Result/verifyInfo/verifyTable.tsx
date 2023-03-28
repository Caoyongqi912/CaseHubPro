import React, { FC, useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { Card, Table } from 'antd';
import { ResponseAPI } from '@/api';
import VerifyColumns from '@/pages/Case/CaseAPI/component/Result/verifyInfo/VerifyColumns';
import MonacoEditorComponent from '@/components/CodeEditor/MonacoEditorComponent';

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
        <MonacoEditorComponent read={true} defaultValue={response} />
      </Card>
      <Card style={{ width: '100%', marginTop: 2 }}>
        <Table columns={VerifyColumns} dataSource={verifyData} />
      </Card>
    </>
  );
};

export default VerifyTable;
