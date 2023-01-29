import React, { FC } from 'react';
import { Row, Tabs, Drawer } from 'antd';

interface SelfProps {
  flag: boolean;
  caseName: string;
  width: number;
  modal?: any;
  setModal?: any;
}

const TestResult: FC<SelfProps> = (props) => {
  const { flag, caseName, width, modal, setModal } = props;

  return (
    <Drawer
      title={
        <span>
          [<strong>{caseName}</strong>] 执行详情
        </span>
      }
      width={width || 1000}
      visible={modal}
      placement="right"
      onClose={() => setModal(false)}
    >
      <Row gutter={[8, 8]}>
        {!flag ? (
          <Tabs style={{ width: '100%', minHeight: 460 }}></Tabs>
        ) : (
          <Tabs></Tabs>
        )}
      </Row>
    </Drawer>
  );
};

export default TestResult;
