import React, { FC, useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { ResponseAPI } from '@/api';

interface SelfProps {
  requestHeaders: [key: string | any][];
  responseHeaders: [key: string | any][];
}

const HeaderTable: FC<SelfProps> = (props) => {
  const { requestHeaders, responseHeaders } = props;

  const Columns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <>
      <Card>
        <Table
          title={() => 'request.header'}
          columns={Columns}
          dataSource={Object.keys(requestHeaders).map((key: any) => ({
            key,
            value: requestHeaders[key],
          }))}
          size="small"
          pagination={false}
        />
      </Card>
      <Card style={{ marginTop: 4 }}>
        <Table
          title={() => 'response.header'}
          columns={Columns}
          dataSource={Object.keys(responseHeaders).map((key: any) => ({
            key,
            value: responseHeaders[key],
          }))}
          size="small"
          pagination={false}
        />
      </Card>
    </>
  );
};

export default HeaderTable;
