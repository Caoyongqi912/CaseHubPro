import React, { FC, useEffect, useState } from 'react';
import { Card, Descriptions, Table } from 'antd';

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
        <Descriptions column={1} title={'Response.Cookie'}>
          {responseCookie
            ? Object.keys(responseCookie).map((key: any) => (
                <Descriptions.Item label={key}>
                  {responseCookie[key]}
                </Descriptions.Item>
              ))
            : null}
        </Descriptions>
      </Card>
    </>
  );
};

export default HeaderTable;
