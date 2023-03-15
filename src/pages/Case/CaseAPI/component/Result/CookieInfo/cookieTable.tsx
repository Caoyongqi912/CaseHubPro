import React, { FC, useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { ResponseAPI } from '@/api';

interface SelfProps {
  responseCookie: [key: string | any][];
}

const HeaderTable: FC<SelfProps> = (props) => {
  const { responseCookie } = props;

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
      <Card style={{ marginTop: 4 }}>
        <Table
          title={() => 'response.cookie'}
          columns={Columns}
          dataSource={Object.keys(responseCookie).map((key: any) => ({
            key,
            value: responseCookie[key],
          }))}
          size="small"
          pagination={false}
        />
      </Card>
    </>
  );
};

export default HeaderTable;
