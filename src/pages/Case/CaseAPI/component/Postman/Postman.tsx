import React, { FC } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { API } from '@/api';
import PostmanBody from '@/pages/Case/CaseAPI/component/Postman/PostmanBody';

interface SelfProps {
  caseInfo: API.IAPICaseInfo[];
  getFormInstance: any;
  SH: any;
  SB: any;
  setResponse: any;
}

const { TabPane } = Tabs;

const Postman: FC<SelfProps> = (props, context) => {
  return (
    <Tabs activeKey={'3'} onChange={(key) => {}}>
      <TabPane key="1" tab={<span>数据管理</span>}>
        {' '}
      </TabPane>
      <TabPane key="2" tab={<span>前置条件</span>}>
        {' '}
      </TabPane>
      <TabPane key="3" tab={<span>接口请求</span>}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false}>
              <PostmanBody {...props} />
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane key="4" tab={<span>出参提取</span>}>
        {' '}
      </TabPane>
      <TabPane key="5" tab={<span>断言</span>}>
        {' '}
      </TabPane>
      <TabPane key="6" tab={<span>后置条件</span>}>
        {' '}
      </TabPane>
    </Tabs>
  );
};

export default Postman;
