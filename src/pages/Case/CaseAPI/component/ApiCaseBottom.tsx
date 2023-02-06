import React, { FC, useEffect, useState } from 'react';
import { Steps, Col, Row, Tabs, Button } from 'antd';
import { API } from '@/api';
import Postman from '@/pages/Case/CaseAPI/component/Postman/Postman';

interface SelfProps {
  caseInfo: API.IAPICaseInfo[];
  getFormInstance: any;
  SH: any;
  SB: any;
}

const ApiCaseBottom: FC<SelfProps> = (props) => {
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<{ key: string; title: string }[]>([]);
  const [steps, setSteps] = useState<{ title: string; content: any }[]>([
    {
      title: 'step1',
      content: <Postman {...props} />,
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
      title: 'step' + stepStr,
      content: <Postman {...props} />,
    });
    setSteps(steps);
  };

  /**
   * 删除最后一步
   */
  const popStep = () => {
    const nextCurrent = current - 1;
    setCurrent(nextCurrent);
    steps.pop();
    setSteps(steps);
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
    <Row gutter={8} style={{ marginTop: 36, minHeight: 500 }}>
      <Col span={24}>
        <Steps current={current} items={items} size={'small'} />
        <br />
        <Col span={24}>
          {steps.map((el, i) => (
            <div
              style={{ display: i === current ? 'block' : 'none' }}
              key={el.title}
            >
              {el.content}
            </div>
          ))}
        </Col>
        <Row gutter={20}>
          <Col span={18}>
            <Button type={'primary'} onClick={addStep}>
              addStep
            </Button>
          </Col>
          <Col span={2}>
            {current > 0 && (
              <Button type={'primary'} onClick={popStep}>
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
  );
};

export default ApiCaseBottom;
