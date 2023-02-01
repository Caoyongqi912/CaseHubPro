import React, { FC } from 'react';
import { Button, Col, Row, Tabs } from 'antd';
import PostmanForm from '@/pages/Case/CaseAPI/component/Postman/PostmanForm';
import { API } from '@/api';

const { TabPane } = Tabs;

interface SelfProps {
  stepsForm: any;
  caseInfo: API.IAPICaseInfo[];
  body: string;
  bodyType: number;
  setBody: any;
  setBodyType: any;
  headers: Array<any>;
  setHeaders: any;
  formData: Array<any>;
  setFromData: any;
}

const ApiCaseBottom: FC<SelfProps> = (props) => {
  return (
    <Row gutter={8} style={{ marginTop: 36, minHeight: 500 }}>
      <Col span={24}>
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
                <PostmanForm {...props} />
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
      </Col>
    </Row>
  );
};

export default ApiCaseBottom;
