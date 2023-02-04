import React, { useEffect, useState } from 'react';
import { Button, Form, Steps } from 'antd';
import FormDemo from '@/pages/Case/Demo/formDEMO';

const Index = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState<{ title: string; content: any }[]>([
    {
      title: 'step1',
      content: <FormDemo form={form} />,
    },
  ]);
  const [items, setItems] = useState<{ key: string; title: string }[]>([]);
  useEffect(() => {
    const i = steps.map((item) => ({ key: item.title, title: item.title }));
    setItems(i);
  }, [steps, current]);

  const addStep = () => {
    const nextCurrent = current + 1;
    const stepStr = nextCurrent + 1;
    setCurrent(nextCurrent);
    const _ = {
      title: 'step' + stepStr,
      content: <FormDemo form={form2} />,
    };
    steps.push(_);
    setSteps(steps);
  };

  const delStep = () => {
    const nextCurrent = current - 1;
    setCurrent(nextCurrent);
    steps.pop();
    setSteps(steps);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <>
      {/*//step*/}
      <Steps current={current} items={items} initial={0} />
      {/*//content*/}
      <div>{steps[current].content}</div>
      {/*//button*/}
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <>
            <Button
              type="primary"
              onClick={() => {
                delStep();
              }}
            >
              -
            </Button>
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          </>
        )}
        {current === steps.length - 1 && (
          <>
            <Button
              type="primary"
              onClick={() => {
                addStep();
              }}
            >
              +
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
