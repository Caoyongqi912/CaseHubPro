import React, { FC } from 'react';
import { Badge, Descriptions, Row, Tabs } from 'antd';
import MyDrawer from '@/components/MyDrawer';
import NoRecord from '@/pages/Case/CaseAPI/component/NoRecord';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const TabPane = Tabs.TabPane;
const DescriptionsItem = Descriptions.Item;

const STATUS = {
  200: { color: '#67C23A', text: 'OK' },
  401: { color: '#F56C6C', text: 'unauthorized' },
  400: { color: '#F56C6C', text: 'Bad Request' },
};

interface SelfProps {
  response: any;
  name: any;
  modal: any;
  setModal: any;
  single: boolean;
}

const Result: FC<SelfProps> = (props) => {
  const { response, name, modal, setModal, single } = props;
  return (
    <>
      <MyDrawer name={name} modal={modal} setModal={setModal}>
        <Row gutter={[8, 8]}>
          {!single ? (
            <Tabs>
              {Object.keys(response).map((name, index) => (
                <TabPane tab={name} key={index.toString()}>
                  <Descriptions column={2} bordered size={'middle'}>
                    <DescriptionsItem label={'测试结果'}>
                      <Badge
                        status={response[name].status ? 'success' : 'error'}
                        text={response[name].status ? 'success' : 'error'}
                      />
                    </DescriptionsItem>
                    <DescriptionsItem label={'请求方式'}>
                      {response[name].method}
                    </DescriptionsItem>
                    <DescriptionsItem label={'HTTP状态码'}>
                      <span
                        style={{
                          // @ts-ignore
                          color: STATUS[response[name].status_code]
                            ? STATUS[response[name].status_code].color
                            : '#F56C6C',
                          marginLeft: 8,
                          marginRight: 8,
                        }}
                      >
                        {response[name].status_code} {/*@ts-ignore*/}
                        {STATUS[response[name].status_code]
                          ? STATUS[response[name].status_code].text
                          : ''}
                      </span>
                    </DescriptionsItem>
                    <DescriptionsItem label={'执行时间'}>
                      <span style={{ marginLeft: 8, marginRight: 8 }}>
                        <span style={{ color: '#67C23A' }}>
                          {response[name].cost}
                        </span>
                      </span>
                    </DescriptionsItem>
                    <DescriptionsItem label={'URL'} span={2}>
                      {response[name].url}
                    </DescriptionsItem>
                    <DescriptionsItem label={'请求体'} span={2}>
                      {response[name].requestData ? (
                        <SyntaxHighlighter language={'json'} style={vs2015}>
                          {response[name].requestData}
                        </SyntaxHighlighter>
                      ) : (
                        <NoRecord height={120} />
                      )}
                    </DescriptionsItem>
                  </Descriptions>
                </TabPane>
              ))}
            </Tabs>
          ) : (
            <Tabs>
              <span>断言</span>
            </Tabs>
          )}
        </Row>
      </MyDrawer>
    </>
  );
};

export default Result;
