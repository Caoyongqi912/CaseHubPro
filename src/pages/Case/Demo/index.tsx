import React from 'react';
import { Card, Col, Row } from 'antd';

const Index = () => {
  return (
    <Row gutter={2}>
      <Col span={4}>
        <Card
          bodyStyle={{
            height: '100%',
          }}
        ></Card>
      </Col>
      <Col span={20}>
        <Card>2</Card>
      </Col>
    </Row>
  );
};

export default Index;
