import React, { useEffect, useState } from 'react';
import { Button, FormInstance, Steps } from 'antd';
import FormDemo from '@/pages/Case/Demo/formDEMO';

const Index = () => {
  const [formList, setFormList] = useState<FormInstance[]>([]);
  const getFormInstance = (form: FormInstance) => {
    setFormList([...formList, form]);
  };
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<{ key: string; title: string }[]>([]);
  const [stepsData, setStepsData] = useState([]);
  const [steps, setSteps] = useState<{ title: string; content: any }[]>([
    {
      title: 'step1',
      content: <FormDemo getFormInstance={getFormInstance} />,
    },
  ]);
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
      content: <FormDemo getFormInstance={getFormInstance} />,
    };
    steps.push(_);
    setSteps(steps);
    console.log('formList', formList);
    setFormList(formList);
  };

  const delStep = () => {
    const nextCurrent = current - 1;
    setCurrent(nextCurrent);
    steps.pop();
    setSteps(steps);
    formList.pop();
    setFormList(formList);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const getForm = () => {
    console.dir(formList);
    let valArr = [];
    formList.forEach((e: FormInstance) => {
      valArr.push(e.getFieldsValue());
    });

    console.log(valArr);
  };
  return (
    <>
      {/*//step*/}
      <Steps current={current} items={items} initial={0} />
      {/*//content*/}
      <div>
        {steps.map((el, i) => (
          <div
            style={{ display: i === current ? 'block' : 'none' }}
            key={el.title}
          >
            {el.content}
          </div>
        ))}
      </div>
      {/*//button*/}
      <div style={{ marginTop: 24 }}>
        <Button onClick={() => getForm()}>Submit</Button>
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
