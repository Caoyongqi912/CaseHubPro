import React, { FC, useEffect, useRef, useState } from 'react';
import { ResponseAPI } from '@/api';
import { Button, Col, Row, Steps } from 'antd';
import VerifyTable from '@/pages/Case/CaseAPI/component/Result/verifyInfo/verifyTable';

interface SelfProps {
  responseInfo: ResponseAPI.IApiResponseResultInfo[] | undefined;
}

const VerifyInfo: FC<SelfProps> = (props) => {
  const { responseInfo } = props;
  const stepRef = useRef<{ title: string; content: any; key: number }[]>([]);
  let uniqueKey = useRef(0);
  const getK: () => number = () => {
    return (uniqueKey.current = ++uniqueKey.current);
  };
  const [steps, setSteps] = useState<
    { title: string; content: any; key: number }[]
  >([]);
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<any>([]);

  const writeSteps = () => {
    if (responseInfo && responseInfo.length > 0) {
      for (let i = 0; i < responseInfo?.length; i++) {
        let _ = {
          title: `step${i + 1}`,
          content: (
            <VerifyTable
              response={responseInfo[i].response.response}
              verifyInfo={responseInfo[i].verify}
            />
          ),
          key: getK(),
        };
        stepRef.current.push(_);
      }
    }
    setSteps(stepRef.current);
  };
  useEffect(() => {
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    setItems(items);
  }, [steps, current]);

  useEffect(() => {
    setSteps([]);
    stepRef.current = [];
    writeSteps();
  }, [responseInfo]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Row gutter={[8, 8]} style={{ marginTop: 10, minHeight: 500 }}>
        <Col span={24}>
          <Steps current={current} items={items} size={'small'} />
          <br />

          {steps.map((el, index) => (
            <div
              style={{ display: index === current ? 'block' : 'none' }}
              key={el.key}
            >
              {el.content}
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}

            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default VerifyInfo;
