import React, { FC, useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { API } from '@/api';
import PostmanBody from '@/pages/Case/CaseAPI/component/Postman/PostmanBody';
import CaseAssertTable from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable';
import CaseVariableTable from '@/pages/Case/CaseAPI/component/Postman/CaseExtractTable';

interface SelfProps {
  caseInfo: API.IAPICaseInfoForm[];
  getFormInstance: any;
  SH: any;
  SB: any;
  SA: any;
  SE: any;
  SP: any;
  setResponse: any;
  detail?: any;
}

const { TabPane } = Tabs;

const Postman: FC<SelfProps> = (props, context) => {
  const [activeKey, setActiveKey] = useState('3');
  return (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => {
        setActiveKey(key);
      }}
    >
      <TabPane key="1" tab={<span>数据管理</span>}>
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
        <CaseVariableTable {...props} SE={props.SE} />
      </TabPane>
      <TabPane key="5" tab={<span>断言</span>}>
        <CaseAssertTable {...props} SA={props.SA} />
      </TabPane>
    </Tabs>
  );
};

export default Postman;
