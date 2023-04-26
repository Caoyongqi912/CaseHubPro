import React, { FC, useState } from 'react';
import { Button, Drawer, Form, FormInstance, message } from 'antd';
import CaseForm from '@/pages/CaseHub/component/CaseForm';

interface SelfProps {
  casePartID: number;
  projectID: number;
  actionRef: any;
}

const AddCase: FC<SelfProps> = (props) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  return (
    <>
      <Drawer
        bodyStyle={{ padding: 0 }}
        visible={drawerVisible}
        width={'65%'}
        title="添加用例"
        onClose={() => setDrawerVisible(false)}
        maskClosable={false}
      >
        <CaseForm {...props} setDrawerVisible={setDrawerVisible} />
      </Drawer>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        添加用例
      </Button>
    </>
  );
};

export default AddCase;
