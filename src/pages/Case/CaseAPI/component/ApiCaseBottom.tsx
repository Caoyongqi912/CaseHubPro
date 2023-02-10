import React, { FC, useEffect, useRef, useState } from 'react';
import { Steps, Col, Row, Table, Tabs, Button, Card } from 'antd';
import { API } from '@/api';
import Postman from '@/pages/Case/CaseAPI/component/Postman/Postman';
import CodeEditor from '@/pages/Case/CaseAPI/component/Postman/CodeEditor';

interface SelfProps {
  caseInfo: API.IAPICaseInfo[];
  getFormInstance: any;
  SH: any;
  SB: any;
  SA: any;
  SE: any;
  headers: any;
  body: any;
  stepInfo: any;
  setStepInfo: any;
}

interface ResponseProps {
  body?: any;
  cost?: number;
  method?: string;
  name?: string;
  response?: string;
  status?: string;
  status_code?: number;
}

const { TabPane } = Tabs;

const STATUS = {
  200: { color: '#67C23A', text: 'OK' },
  401: { color: '#F56C6C', text: 'unauthorized' },
  400: { color: '#F56C6C', text: 'Bad Request' },
};

const tabExtra = (response: ResponseProps) => {
  return response && response.response ? (
    <div style={{ marginRight: 16 }}>
      <span>
        Status:
        <span
          style={{
            // @ts-ignore
            color: STATUS[response.status_code]
              ? STATUS[response.status_code].color
              : '#F56C6C',
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {response.status_code} {/*//@ts-ignore*/}
          {STATUS[response.status_code]
            ? STATUS[response.status_code].text
            : ''}
        </span>
        <span style={{ marginLeft: 8, marginRight: 8 }}>
          Time: <span style={{ color: '#67C23A' }}>{response.cost}</span>
        </span>
      </span>
    </div>
  ) : null;
};

const ApiCaseBottom: FC<SelfProps> = (props) => {
  const { setStepInfo, stepInfo, body, SH, SB, headers } = props;
  const [current, setCurrent] = useState(0);
  let uniqueKey = useRef(0);
  const [response, setResponse] = useState<ResponseProps>({});

  const getK: () => number = () => {
    return (uniqueKey.current = ++uniqueKey.current);
  };
  const [items, setItems] = useState<{ key: string; title: string }[]>([]);
  const [steps, setSteps] = useState<
    { title: string; content: any; key: number }[]
  >([
    {
      title: 'step1',
      content: <Postman {...props} setResponse={setResponse} />,
      key: getK(),
    },
  ]);
  useEffect(() => {
    const i = steps.map((item) => ({ key: item.title, title: item.title }));
    setItems(i);
  }, [steps, current]);

  /**
   * 添加一步
   */
  const addStep = () => {
    const nextCurrent = current + 1;
    const stepStr = nextCurrent + 1;
    setCurrent(nextCurrent);
    steps.push({
      title: `step${stepStr}`,
      content: <Postman {...props} setResponse={setResponse} />,
      key: getK(),
    });

    setSteps(steps);
  };

  /**
   * 删除步骤
   */
  const delStep = () => {
    steps.splice(current, 1);
    stepInfo.splice(current, 1);
    setStepInfo(props.stepInfo);
    steps.map((value, index, array) => {
      steps[index].title = `step${index}`;
    });
    body.splice(current, 1);
    SB(body);
    headers.splice(current, 1);
    SH(headers);
    setSteps(steps);
    setCurrent(current - 1);
  };

  //上一步
  const prev = () => {
    setCurrent(current - 1);
  };
  //下一步
  const next = () => {
    setCurrent(current + 1);
  };

  const responseColumns = [
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
  const toTable = (field: string) => {
    // @ts-ignore
    if (!response[field]) {
      return [];
    }
    // @ts-ignore
    const data = response[field];
    return Object.keys(data).map((key) => ({
      key,
      value: data[key],
    }));
  };
  return (
    <>
      <Row gutter={[8, 8]} style={{ marginTop: 10, minHeight: 500 }}>
        <Col span={24}>
          <Steps current={current} items={items} size={'small'} />
          <br />
          <Col span={24}>
            {steps.map((el, i) => (
              <div
                style={{ display: i === current ? 'block' : 'none' }}
                key={el.key}
              >
                {el.content}
              </div>
            ))}
          </Col>
          <Row gutter={20}>
            <Col span={16}>
              {current === steps.length - 1 && (
                <Button type={'primary'} onClick={addStep}>
                  添加一步
                </Button>
              )}
            </Col>
            <Col span={2}>
              {current > 0 && (
                <Button type={'primary'} onClick={delStep}>
                  删除此步
                </Button>
              )}
            </Col>
            <Col span={2}>
              {current > 0 && (
                <Button type={'primary'} onClick={prev}>
                  上一步
                </Button>
              )}
            </Col>
            <Col span={2}>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  下一步
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        {Object.keys(response).length === 0 ? null : (
          <Card style={{ marginTop: 3, width: '100%' }}>
            <Tabs
              style={{ width: '100%' }}
              tabBarExtraContent={tabExtra(response)}
            >
              <TabPane tab="Body" key="1">
                <CodeEditor
                  value={response.response}
                  language={'json'}
                  height={'30vh'}
                />
              </TabPane>
              <TabPane tab="Cookie" key="2">
                <Table
                  columns={responseColumns}
                  dataSource={toTable('cookies')}
                  size="small"
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Headers" key="3">
                <Table
                  columns={responseColumns}
                  dataSource={toTable('headers')}
                  size="small"
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </Card>
        )}
      </Row>
    </>
  );
};
export default ApiCaseBottom;
