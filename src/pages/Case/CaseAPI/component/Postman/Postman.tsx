import React, { FC, useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { API } from '@/api';
import PostmanBody from '@/pages/Case/CaseAPI/component/Postman/PostmanBody';
import CaseAssertTable from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable';
import {
  SetAsserts,
  SetBody,
  SetExtract,
  SetFormInstance,
  SetHeaders,
  SetParams,
} from '@/pages/Case/CaseAPI/MyHook/func';
import CaseExtractTable from '@/pages/Case/CaseAPI/component/Postman/CaseExtractTable';

interface SelfProps {
  caseInfo: API.IAPICaseInfoForm[];
  setFormInstance: SetFormInstance;
  SetHeaders: SetHeaders;
  SetBody: SetBody;
  SetAsserts: SetAsserts;
  SetExtracts: SetExtract;
  SetParams: SetParams;
  stepInfo: any;
  ExtractsRef: any;
  AssertsRef: any;
  setResponse: any;
  step: number;
  apiStepDetail?: any;
}

const { TabPane } = Tabs;

const Postman: FC<SelfProps> = (props) => {
  const { SetAsserts, SetExtracts } = props;
  const [activeKey, setActiveKey] = useState('3');
  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
        }}
      >
        {/*<TabPane key="1" tab={<span>数据管理</span>}>*/}
        {/*  {' '}*/}
        {/*</TabPane>*/}
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
          <CaseExtractTable {...props} SetExtracts={SetExtracts} />
        </TabPane>
        <TabPane key="5" tab={<span>断言</span>}>
          <CaseAssertTable {...props} SetAsserts={SetAsserts} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Postman;
