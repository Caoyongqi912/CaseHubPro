import React from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { hostOpt } from '@/api/host';
import { API } from '@/api';

interface selfProps {
  reload?: Function | undefined;
}

const AddHost: React.FC<selfProps> = (props) => {
  let { reload } = props;
  return (
    <ModalForm<{
      name: string;
      host: string;
      desc: string;
    }>
      title="新建host"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建host
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values: API.IHost) => {
        await hostOpt('POST', values);
        reload!(true);
        return true;
      }}
      // 关闭执录入执行
      modalProps={{
        onCancel: () => console.log('close'),
      }}
    >
      <ProFormText
        name="name"
        label="host name"
        placeholder="input your host name"
        required={true}
      />
      <ProFormText
        name="host"
        label="host"
        placeholder="input your host"
        required={true}
      />
      <ProFormText
        name="port"
        label="port"
        placeholder="input your port"
        required={false}
      />
      <ProFormText
        name="desc"
        label="desc"
        placeholder="input your host desc"
      />
    </ModalForm>
  );
};

export default AddHost;
