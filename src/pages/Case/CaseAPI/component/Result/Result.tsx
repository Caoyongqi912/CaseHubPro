import React, { FC, useEffect, useState } from 'react';
import { Drawer, Row, Tabs } from 'antd';
import { ResponseAPI } from '@/api';
import { getApiResponse } from '@/api/interface';
import { IconFont } from '@/utils/IconFont';
import VerifyInfo from './verifyInfo/verifyInfo';
import ResultInfo from '@/pages/Case/CaseAPI/component/Result/ResultInfo';
import HeaderInfo from '@/pages/Case/CaseAPI/component/Result/HeaderInfo';
import CookieInfo from '@/pages/Case/CaseAPI/component/Result/CookieInfo';
import MonacoEditorComponent from '@/components/CodeEditor/MonacoEditorComponent';

const TabPane = Tabs.TabPane;

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
      if (res.code === 0) {
        return res.data;
      }
    }
  };
  useEffect(() => {
    getResponse().then((data) => setResponse(data));
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
        <Tabs
          style={{ width: '100%', minHeight: 460 }}
          tabPosition={'left'}
          size={'large'}
        >
          <TabPane
            tab={
              <span>
                <IconFont type={'icon-yongliliebiao'} />
                基本信息
              </span>
            }
            key={'1'}
          >
            <ResultInfo response={response!} />
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
            <MonacoEditorComponent
              height={'100vh'}
              read={true}
              defaultValue={response?.interfaceLog}
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
          >
            <HeaderInfo resultInfo={response?.resultInfo!} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconFont type="icon-cookies-1" />
                Cookie
              </span>
            }
            key="5"
          >
            <CookieInfo resultInfo={response?.resultInfo!} />
          </TabPane>
        </Tabs>
      </Row>
    </Drawer>
  );
};

export default Result;
