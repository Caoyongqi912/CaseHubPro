import React from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, Form } from 'antd';
import { SetPwdServer } from '@/api/user';
import { clearToken } from '@/utils/token';
import { history } from 'umi';

const SetPwd = () => {
  return (
    <ModalForm<{
      old_password: string;
      new_password: string;
    }>
      title="修改密码"
      trigger={<Button>修改密码</Button>}
      autoFocusFirstInput
      onFinish={async (form: API.IPassword) => {
        const res: API.IResponse = await SetPwdServer(form);
        if (res.code === 0) {
          message.success(res.msg);
          clearToken();
          history.push('/login');
          return true;
        } else {
          message.error(res.msg);
          return false;
        }
      }}
    >
      <ProFormText.Password
        name="old_password"
        label="旧密码"
        placeholder="input old_password"
        required={true}
      />
      <ProFormText.Password
        name="new_password"
        label="新密码"
        placeholder="input new_password"
        required={true}
      />
    </ModalForm>
  );
};

export default SetPwd;
