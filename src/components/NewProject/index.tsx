import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React from 'react';
import { projectOpt } from '@/api/project';
import { searchUser } from '@/api/user';
import MohuSearch from '@/components/UserOpt/MohuSearch';

interface SearchUser {
  value: number | undefined;
  label: string | undefined;
}

interface selfProps {
  reload: Function | undefined;
}

const Index: React.FC<selfProps> = (props) => {
  let { reload } = props;
  return (
    <ModalForm<{
      name: string;
      desc: string;
      adminID: number;
    }>
      title="新建项目"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建项目
        </Button>
      }
      autoFocusFirstInput
      // 关闭执录入执行
      modalProps={{
        onCancel: () => console.log('close'),
      }}
      onFinish={async (values) => {
        const res = await projectOpt(values, 'POST');
        message.success(res.msg);
        reload!(true);
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="项目名称"
        placeholder="input your project name"
        required={true}
      />
      <ProFormText
        name="desc"
        label="项目描述"
        placeholder="input your project desc"
      />
      <ProFormSelect
        showSearch
        name="adminID"
        label="项目负责人"
        placeholder="input your admin name to search"
        rules={[{ required: true, message: 'Please select !' }]}
        debounceTime={2000}
        request={async (params) => {
          return await MohuSearch(params);
        }}
      />
    </ModalForm>
  );
};

export default Index;
