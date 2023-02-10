import React, { useEffect, useRef, useState } from 'react';
import { Button, FormInstance, Steps } from 'antd';
import FormDemo from '@/pages/Case/Demo/formDEMO';

const Index = () => {
  const [formList, setFormList] = useState<
    { curr: number; form: FormInstance }[]
  >([]);
  const getFormInstance = (data: { curr: number; form: FormInstance }) => {
    setFormList([...formList, data]);
  };
  let uniqueKey = useRef(0);
  const getK: () => number = () => {
    return (uniqueKey.current = ++uniqueKey.current);
  };
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<{ key: string; title: string }[]>([]);
  const [steps, setSteps] = useState<
    { title: string; content: any; key: number }[]
  >([
    {
      title: `step${current}`,
      content: <FormDemo getFormInstance={getFormInstance} current={current} />,
      key: getK(),
    },
  ]);
  useEffect(() => {
    const i = steps.map((item, index) => ({
      key: item.title,
      title: item.title,
    }));
    setItems(i);
  }, [steps, current]);

  //添加一步
  const addStep = () => {
    const nextCurrent = current + 1;
    setCurrent(nextCurrent);
    const _ = {
      title: `step${nextCurrent}`,
      content: (
        <FormDemo getFormInstance={getFormInstance} current={nextCurrent} />
      ),
      key: getK(),
    };
    steps.push(_);
    setSteps(steps);
    setFormList(formList);
  };
  // 删除步骤
  const delStep = () => {
    steps.splice(current, 1);
    formList.splice(current, 1);
    steps.map((value, index, array) => {
      steps[index].title = `step${index}`;
    });
    setSteps(steps);
    setFormList(formList);
    setCurrent(current - 1);
  };

  const getForm = () => {
    let arr: any[] = [];
    formList.forEach((value, index, array) => {
      arr.push({
        index: value.curr,
        data: value.form.getFieldsValue().username,
      });
    });
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
      <Steps current={current} items={items} size={'small'} />
      {/*//content*/}

      <div style={{ marginTop: 10 }}>
        {steps.map((el, i) => (
          <div
            style={{ display: i === current ? 'block' : 'none' }}
            key={el.key}
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
              删除此步骤
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
              添加
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
