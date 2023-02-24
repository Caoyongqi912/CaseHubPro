import React, { FC } from 'react';
import { Drawer } from 'antd';

interface SelfProps {
  name: string;
  modal: any;
  setModal: any;
}

const Index: FC<SelfProps> = (props, context) => {
  const { modal, setModal, name } = props;
  return (
    <Drawer
      bodyStyle={{ padding: 0 }}
      visible={modal}
      width={'65%'}
      title={name}
      onClose={() => setModal(false)}
      maskClosable={false}
    >
      {context}
    </Drawer>
  );
};

export default Index;
