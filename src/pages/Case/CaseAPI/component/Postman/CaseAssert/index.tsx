import React, { FC } from 'react';
import { Col, Row, Table, Tabs } from 'antd';

interface SelfProps {}

const Index: FC<SelfProps> = (props, context) => {
  return (
    <Row gutter={8} style={{ marginTop: 30, minHeight: 500 }}>
      <Col span={24}>
        <Tabs>
          <h1>1</h1>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Index;
