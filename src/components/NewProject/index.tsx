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

interface SearchUser {
  value: number;
  label: string;
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
        try {
          const res = await projectOpt(values, 'POST');
          if (res.code == 0) {
            message.success(res.msg);
            reload!(true);
            return true;
          } else {
            message.error(res.msg);
            console.log(res);
            return false;
          }
        } catch (e) {
          console.log(e);
        }
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
          let res: SearchUser[] = [];
          const searchData: API.IMoHuSearchUser = {
            target: 'username',
            value: params.keyWords,
          };
          let { data } = await searchUser(searchData);
          data.map((item: API.IUser) => {
            let users: SearchUser = {
              label: item.username,
              value: item.id,
            };
            res.push(users);
          });
          return res;
        }}
      />
    </ModalForm>
  );
};

export default Index;
