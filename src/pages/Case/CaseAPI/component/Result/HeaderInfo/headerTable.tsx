import React, { FC, useEffect, useState } from 'react';
import { Card, Descriptions, Table } from 'antd';
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
        <Descriptions column={1} title={'Request.Header'}>
          {Object.keys(requestHeaders).map((key: any) => (
            <Descriptions.Item label={key}>
              {requestHeaders[key]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
      <Card style={{ marginTop: 4 }}>
        <Descriptions column={1} title={'Response.Header'}>
          {Object.keys(responseHeaders).map((key: any) => (
            <Descriptions.Item label={key}>
              {responseHeaders[key]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </>
  );
};

export default HeaderTable;
