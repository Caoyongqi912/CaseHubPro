import React from 'react';
import SplitPane from 'react-split-pane';
import { PageContainer } from '@ant-design/pro-layout';
import './index.less';
import { Card, Col, Row } from 'antd';

const Index = () => {
  return (
    <PageContainer title={false}>
      <Row gutter={16}>
        <SplitPane split="vertical" minSize={10} maxSize={30} defaultSize={10}>
          <Row gutter={8}>
            <Col span={24}>
              <Card
                bodyStyle={{
                  padding: 24,
                  height: '100%',
                  overflowX: 'hidden',
                  overflow: 'auto',
                }}
              >
                <div>1</div>
              </Card>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <Card
                bodyStyle={{
                  padding: 24,
                  height: '100%',
                  overflowX: 'hidden',
                  overflow: 'auto',
                }}
              >
                <div>1</div>
              </Card>
            </Col>
          </Row>
        </SplitPane>
      </Row>
    </PageContainer>
  );
};

export default Index;
