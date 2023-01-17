import React from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addDepartmentInfo, searchUser } from '@/api/user';

interface selfProps {
  reload: Function | undefined;
}

interface SearchUser {
  value: number | undefined;
  label: string | undefined;
}

const AddDepartment: React.FC<selfProps> = (props) => {
  let { reload } = props;

  return (
    <ModalForm<{
      name: string;
      desc: string;
      adminID: number;
      tags: Array<string>;
    }>
      title="添加部门"
      trigger={
        <Button>
          <PlusOutlined />
          添加部门
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values: API.IDepartment) => {
        const res = await addDepartmentInfo(values);
        message.success(res.msg);
        reload!(true);
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="部门名称"
        placeholder="input username"
        required={true}
      />
      <ProFormText
        name="desc"
        label="描述"
        placeholder="input username"
        required={false}
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
      <ProFormSelect
        name="tags"
        label="标签"
        placeholder="input tags"
        mode="tags"
        required={true}
      />
    </ModalForm>
  );
};

export default AddDepartment;