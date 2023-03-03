import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Steps, Col, Row, Table, Tabs, Button, Card, FormInstance } from 'antd';
import { API } from '@/api';
import Postman from '@/pages/Case/CaseAPI/component/Postman/Postman';
import CodeEditor from '@/components/CodeEditor';
import {
  setAsserts,
  setBody,
  setExtract,
  SetFormInstance,
  setHeaders,
  setParams,
} from '@/pages/Case/CaseAPI/func';

interface SelfProps {
  caseInfo: API.IAPICaseInfoForm[];
  setFormInstance: SetFormInstance;
  SH: setHeaders;
  SB: setBody;
  SA: setAsserts;
  SE: setExtract;
  SP: setParams;
  stepInfo: any;
  apiStepsDetail?: API.IInterfaceStep[];
}

interface ResponseProps extends API.IObjGet {
  body?: any;
  cost?: number;
  method?: string;
  name?: string;
  response?: string;
  status?: string;
  status_code?: number;
}

const { TabPane } = Tabs;

const STATUS: API.IObjGet = {
  200: { color: '#67C23A', text: 'OK' },
  401: { color: '#F56C6C', text: 'unauthorized' },
  400: { color: '#F56C6C', text: 'Bad Request' },
};

const tabExtra = (response: ResponseProps) => {
  return response && response.response ? (
    <div style={{ marginRight: 16 }}>
      <span>
        StatusCode:
        <span
          style={{
            color: STATUS[response.status_code!]
              ? STATUS[response.status_code!].color
              : '#F56C6C',
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {response.status_code}
          {STATUS[response.status_code!]
            ? STATUS[response.status_code!].text
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
  const { stepInfo, SH, SB, SP, SE, SA, apiStepsDetail } = props;
  const [current, setCurrent] = useState(0);
  let uniqueKey = useRef(0);
  const [response, setResponse] = useState<ResponseProps>({});
  const arrRef = useRef<any[]>([]);
  const getK: () => number = () => {
    return (uniqueKey.current = ++uniqueKey.current);
  };
  const [items, setItems] = useState<any>([]);
  const [steps, setSteps] = useState<{ content: any; key: number }[]>([]);

  useEffect(() => {
    if (apiStepsDetail) {
      for (let i = 0; i < apiStepsDetail?.length!; i++) {
        const _ = {
          content: (
            <Postman
              {...props}
              apiStepDetail={apiStepsDetail![i]}
              setResponse={setResponse}
              step={i}
            />
          ),
          key: getK(),
        };
        arrRef.current.push(_);
      }
      setSteps(arrRef.current);
    } else {
      const _ = {
        content: <Postman {...props} setResponse={setResponse} step={0} />,
        key: getK(),
      };
      arrRef.current.push(_);
      setSteps(arrRef.current);
    }
  }, [apiStepsDetail]);

  useEffect(() => {
    const i = steps.map((item) => ({ key: item.key }));
    setItems(i);
  }, [steps, current, apiStepsDetail]);

  /**
   * 添加一步
   */
  const addStep = () => {
    const nextCurrent = current + 1;
    // const stepStr = nextCurrent + 1;
    setCurrent(nextCurrent);
    arrRef.current.push({
      content: (
        <Postman {...props} setResponse={setResponse} step={nextCurrent} />
      ),
      key: getK(),
    });
    setSteps(arrRef.current);
  };

  /**
   * 删除步骤
   */
  const delStep = () => {
    steps.splice(current, 1);
    // console.log(steps);
    stepInfo.current.splice(current, 1);
    SH(current, null, true);
    SB(current, null, true);
    SA(current, null, true);
    SP(current, null, true);
    SE(current, null, true);
    setSteps(arrRef.current);
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
    if (!response[field]) {
      return [];
    }
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
          {/*// @ts-ignore*/}
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
              <TabPane tab="Response-Body" key="1">
                <CodeEditor
                  value={response.response}
                  language={'json'}
                  height={'30vh'}
                />
              </TabPane>
              <TabPane tab="Response-Cookie" key="2">
                <Table
                  columns={responseColumns}
                  dataSource={toTable('cookies')}
                  size="small"
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Response-Headers" key="3">
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
