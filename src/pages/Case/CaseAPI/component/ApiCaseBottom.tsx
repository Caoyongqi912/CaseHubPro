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
import {
  SetAsserts,
  SetBody,
  SetExtract,
  SetFormInstance,
  SetHeaders,
  SetParams,
} from '@/pages/Case/CaseAPI/MyHook/func';
import TestResult from '@/pages/Case/CaseAPI/component/Result/TestResult';

interface SelfProps {
  caseInfo: API.IAPICaseInfoForm[];
  setFormInstance: SetFormInstance;
  SetHeaders: SetHeaders;
  SetBody: SetBody;
  SetAsserts: SetAsserts;
  SetExtracts: SetExtract;
  SetParams: SetParams;
  ExtractsRef: any;
  AssertsRef: any;
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

const ApiCaseBottom: FC<SelfProps> = (props) => {
  const {
    stepInfo,
    SetAsserts,
    SetBody,
    SetParams,
    SetExtracts,
    SetHeaders,
    apiStepsDetail,
  } = props;
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
    stepInfo.current.splice(current, 1);
    SetHeaders(current, null, true);
    SetBody(current, null, true);
    SetAsserts(current, null, true);
    SetParams(current, null, true);
    SetExtracts(current, null, true);
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

  return (
    <>
      <Row gutter={[8, 8]} style={{ marginTop: 10, minHeight: 500 }}>
        <Col span={24}>
          {/*<Button type={'primary'}>脚本</Button>*/}
          {/*<br />*/}
          {/*<br />*/}

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
      <TestResult response={response} />
    </>
  );
};
export default ApiCaseBottom;
