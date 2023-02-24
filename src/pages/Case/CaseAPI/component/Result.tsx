import React, { FC, useEffect, useState } from 'react';
import { Badge, Descriptions, Drawer, Row, Tabs } from 'antd';
import { API } from '@/api';
import { getApiResponse } from '@/api/interface';
import { IconFont } from '@/utils/IconFont';

const TabPane = Tabs.TabPane;
const DescriptionsItem = Descriptions.Item;

const STATUS: API.IObjGet = {
  200: { color: '#67C23A', text: 'OK' },
  401: { color: '#F56C6C', text: 'unauthorized' },
  400: { color: '#F56C6C', text: 'Bad Request' },
};

interface SelfProps {
  uid: string | undefined;
  modal: any;
  setModal: any;
  single: boolean;
}

const Result: FC<SelfProps> = (props) => {
  const { modal, setModal, single, uid } = props;
  const [response, setResponse] = useState({});

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
              <DescriptionsItem label="测试人">
                {response.starterName}
              </DescriptionsItem>

              <DescriptionsItem label="测试结果">
                <Badge
                  status={response.status ? 'success' : 'error'}
                  text={response.status ? 'SUCCESS' : 'FAIL'}
                />
              </DescriptionsItem>
              <DescriptionsItem label="请求方式">{'GET'}</DescriptionsItem>
              <DescriptionsItem label="测试时间">
                {response.create_time}
              </DescriptionsItem>
              <DescriptionsItem label="运行时间">
                {response.useTime}
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
          ></TabPane>
          <TabPane
            tab={
              <span>
                <IconFont type="icon-rizhi" />
                执行日志
              </span>
            }
            key="3"
          ></TabPane>
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
