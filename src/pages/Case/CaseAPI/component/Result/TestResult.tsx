import React, { FC, useEffect, useState } from 'react';
import { Card, Row, Table, Tabs, Tag } from 'antd';
import CodeEditor from '@/components/CodeEditor';
import { API, ResponseAPI } from '@/api';
import VerifyColumns from '@/pages/Case/CaseAPI/component/Result/verifyInfo/VerifyColumns';
import { CONFIG } from '@/utils/config';
import MonacoEditorComponent from '@/components/CodeEditor/MonacoEditorComponent';

const { TabPane } = Tabs;

interface SelfProps {
  response: any;
}

interface ResponseProps extends API.IObjGet {
  body?: any;
  cost?: number;
  method?: string;
  name?: string;
  response?: string;
  status?: string;
  status_code?: number;
  extracts?: API.IObjGet[];
  verifyInfo?: ResponseAPI.IVerify[];
}

const STATUS: API.IObjGet = {
  200: { color: '#67C23A', text: 'OK' },
  401: { color: '#F56C6C', text: 'unauthorized' },
  400: { color: '#F56C6C', text: 'Bad Request' },
};

const TestResult: FC<SelfProps> = (props) => {
  const { response } = props;
  const [responseBody, setResponseBody] = useState<any>(response?.response);
  useEffect(() => {
    setResponseBody(response);
  }, [response]);

  const tabExtra = (response: ResponseProps) => {
    if (!response || !response.response) return null;
    const { status_code, cost } = response;
    const { color, text = '' } = STATUS[status_code!] || {
      color: '#F56C6C',
      text: '',
    };
    return (
      <div className="tab-extra">
        <span>
          StatusCode:
          <span className="status" style={{ color }}>
            {status_code}
            {text}
          </span>
          <span style={{ marginLeft: 8, marginRight: 8 }}>
            Time: <span style={{ color: '#67C23A' }}>{cost}</span>
          </span>
        </span>
      </div>
    );
  };

  const ResponseColumns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  const extractColumns = [
    {
      title: '变量名',
      dataIndex: 'key',
      render: (text: string) => {
        return <Tag color={'green'}>{text}</Tag>;
      },
    },
    {
      title: '提取目标',
      dataIndex: 'target',
      render: (text: string) => {
        return (
          <Tag color={'blue'}>{CONFIG.EXTRACT_TARGET_ENUM[text].text}</Tag>
        );
      },
    },
    {
      title: '提取值',
      dataIndex: 'val',
      valueType: 'code',
      render: (text: string) => {
        return <Tag color={'green'}>{text}</Tag>;
      },
    },
  ];

  const toTable = (field: string) => {
    const data = response[field] || [];
    return field === 'extracts' || field === 'asserts'
      ? data
      : Object.keys(data).map((key) => ({
          key,
          value: data[key],
        }));
  };
  return (
    <Row gutter={[8, 8]} style={{ marginTop: 10 }}>
      {Object.keys(response).length === 0 ? null : (
        <Card style={{ marginTop: 3, width: '100%' }}>
          <Tabs
            style={{ width: '100%' }}
            tabBarExtraContent={tabExtra(response)}
          >
            <TabPane tab="相应头" key="3">
              <Table
                columns={ResponseColumns}
                dataSource={toTable('headers')}
                size="small"
                pagination={false}
              />
            </TabPane>
            <TabPane tab="响应体" key="1">
              <MonacoEditorComponent value={response.response} read={true} />
            </TabPane>
            <TabPane tab="Cookie" key="2">
              <Table
                columns={ResponseColumns}
                dataSource={toTable('cookies')}
                size="small"
                pagination={false}
              />
            </TabPane>
            <TabPane tab="响应参数提取" key="4">
              <Table
                columns={extractColumns}
                dataSource={toTable('extracts')}
                size="small"
                pagination={false}
              />
            </TabPane>
            <TabPane tab="断言" key="5">
              <Table
                columns={VerifyColumns}
                dataSource={toTable('asserts')}
                size="small"
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </Card>
      )}
    </Row>
  );
};

export default TestResult;
