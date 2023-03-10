import React, { FC, useEffect, useState } from 'react';
import { Badge, Descriptions, Drawer, Row, Tabs } from 'antd';
import { API, ResponseAPI } from '@/api';
import { getApiResponse } from '@/api/interface';
import { IconFont } from '@/utils/IconFont';
import CodeEditor from '@/components/CodeEditor';
import VerifyInfo from './verifyInfo/verifyInfo';

const TabPane = Tabs.TabPane;
const DescriptionsItem = Descriptions.Item;

interface SelfProps {
  uid: string | undefined;
  modal: any;
  setModal: any;
  single: boolean;
}

const Result: FC<SelfProps> = (props) => {
  const { modal, setModal, uid } = props;
  const [response, setResponse] = useState<ResponseAPI.IApiResponse>();

  const getResponse = async () => {
    if (uid) {
      const res = await getApiResponse({ uid: uid });
      console.log(res);
      if (res.code === 0) {
        setResponse(res.data);
      }
    }
  };
  useEffect(() => {
    getResponse();
  }, [uid]);

  return (
    <Drawer
      title={'测试结果'}
      width={'70%'}
      maskClosable={false}
      visible={modal}
      onClose={() => {
        setModal(false);
      }}
      placement={'right'}
    >
      <Row gutter={[8, 8]}>
        <Tabs style={{ width: '100%', minHeight: 460 }} tabPosition={'left'}>
          <TabPane
            tab={
              <span>
                <IconFont type={'icon-yongliliebiao'} />
                基本信息
              </span>
            }
            key={'1'}
          >
            <Descriptions column={2} bordered size={'default'}>
              <DescriptionsItem label="用例名称">
                {response?.interfaceName}
              </DescriptionsItem>
              <DescriptionsItem label="测试结果">
                <Badge
                  status={response?.status === 'SUCCESS' ? 'success' : 'error'}
                  text={response?.status}
                />
              </DescriptionsItem>
              <DescriptionsItem label="用例描述">
                {response?.interfaceName}
              </DescriptionsItem>

              <DescriptionsItem label="测试人">
                {response?.starterName}
              </DescriptionsItem>
              <DescriptionsItem label="测试时间">
                {response?.create_time}
              </DescriptionsItem>
              <DescriptionsItem label="运行时间">
                {response?.useTime}
              </DescriptionsItem>
            </Descriptions>
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconFont type="icon-duanyan" />
                断言
              </span>
            }
            key="2"
          >
            <VerifyInfo responseInfo={response?.resultInfo} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconFont type="icon-rizhi" />
                执行日志
              </span>
            }
            key="3"
          >
            <CodeEditor
              height={'100vh'}
              language={'plaintext'}
              read={true}
              value={response?.interfaceLog}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconFont type="icon-header" />
                Header
              </span>
            }
            key="4"
          ></TabPane>
          <TabPane
            tab={
              <span>
                <IconFont type="icon-cookies-1" />
                Cookie
              </span>
            }
            key="5"
          ></TabPane>
        </Tabs>
      </Row>
    </Drawer>
  );
};

export default Result;