import React, { FC } from 'react';
import { Card, Descriptions } from 'antd';

interface SelfProps {
  requestHeaders: [key: string | any][];
  responseHeaders: [key: string | any][];
}

const HeaderDescriptions: FC<SelfProps> = (props) => {
  const { requestHeaders, responseHeaders } = props;
  return (
    <>
      <Card>
        <Descriptions column={1} title={'Request.Header'}>
          {requestHeaders
            ? Object.keys(requestHeaders).map((key: any) => (
                <Descriptions.Item label={key}>
                  {requestHeaders[key]}
                </Descriptions.Item>
              ))
            : null}
        </Descriptions>
      </Card>
      <Card style={{ marginTop: 4 }}>
        <Descriptions column={1} title={'Response.Header'}>
          {responseHeaders
            ? Object.keys(responseHeaders).map((key: any) => (
                <Descriptions.Item label={key}>
                  {responseHeaders[key]}
                </Descriptions.Item>
              ))
            : null}
        </Descriptions>
      </Card>
    </>
  );
};

export default HeaderDescriptions;
