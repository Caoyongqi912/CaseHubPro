import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { departmentQuery, UserOpt, userTagQuery } from '@/api/user';

interface selfProps {
  reload: Function | undefined;
}

const Index: React.FC<selfProps> = (props) => {
  let { reload } = props;

  return (
    <ModalForm<{
      username: string;
      phone: string;
      gender: string;
      departmentID: number;
      departmentName: string;
      tagName: string;
    }>
      title="添加用户"
      trigger={
        <Button>
          <PlusOutlined />
          添加用户
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => {
          console.log('oncancel');
        },
      }}
      onFinish={async (values: API.IUser) => {
        const res = await UserOpt(values, 'POST');
        message.success(res.msg);
        reload!(true);
        return true;
      }}
    >
      <ProFormText
        name="username"
        label="用户名"
        placeholder="input username"
        required={true}
      />
      <ProFormText
        name="phone"
        label="电话"
        placeholder="input phone"
        required={true}
      />
      <ProFormSelect
        name="gender"
        label="性别"
        placeholder="input gender"
        required={true}
        valueEnum={{
          MALE: 'MALE',
          FEMALE: 'FEMALE',
        }}
      />
      <ProFormSelect
        showSearch
        name="departmentID"
        label="部门"
        placeholder="input department"
        required={false}
        request={async () => {
          let data: any;
          ({ data } = await departmentQuery());
          const res: RequestOptionsType[] = [];
          data.forEach((item: API.IDepartment) => {
            res.push({
              label: item.name,
              value: item.uid,
            });
          });
          return res;
        }}
      />
      <ProFormSelect
        name="tagName"
        label="标签"
        placeholder="input tag"
        required={false}
        dependencies={['departmentID']}
        request={async (params) => {
          const res: RequestOptionsType[] = [];
          if (params.departmentID) {
            const form: API.IQueryDepartmentTags = {
              uid: params.departmentID,
            };
            let { data } = await userTagQuery(form);
            data.forEach((item: any) => {
              res.push({
                label: item.name,
                value: item.name,
              });
            });
          }

          return res;
        }}
      />
    </ModalForm>
  );
};

export default Index;
