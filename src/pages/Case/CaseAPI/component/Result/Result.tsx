import React, { FC, useEffect, useState } from 'react';
import { Drawer, Row, Spin, Tabs } from 'antd';
import { ResponseAPI } from '@/api';
import { getApiResponse } from '@/api/interface';
import { IconFont } from '@/utils/IconFont';
import VerifyInfo from './verifyInfo/verifyInfo';
import ResultInfo from '@/pages/Case/CaseAPI/component/Result/ResultInfo';
import HeaderInfo from '@/pages/Case/CaseAPI/component/Result/HeaderInfo';
import CookieInfo from '@/pages/Case/CaseAPI/component/Result/CookieInfo';
import AceCodeEditor from '@/components/CodeEditor/AceCodeEditor';

const TabPane = Tabs.TabPane;

interface SelfProps {
  uid?: string;
  modal: any;
  setModal: any;
  single: boolean;
  result?: ResponseAPI.IApiResponse;
}

const Result: FC<SelfProps> = (props) => {
  const { modal, setModal, uid, result } = props;
  const [load, setLoad] = useState<boolean>(true);
  const [response, setResponse] = useState<ResponseAPI.IApiResponse>();

  const getResponse = async () => {
    if (uid) {
      const { code, data } = await getApiResponse({ uid: uid });
      if (code === 0) {
        setLoad(false);
        return data;
      }
    }
  };
  useEffect(() => {
    if (uid) {
      getResponse().then((data) => setResponse(data));
    } else if (result) {
      setResponse(result);
      setLoad(false);
    }
  }, [uid, result]);

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
      <Spin tip={'运行中。。'} size={'large'} spinning={load}>
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
              <AceCodeEditor
                readonly={true}
                value={response?.interfaceLog}
                height={'100vh'}
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
      </Spin>
    </Drawer>
  );
};

export default Result;
